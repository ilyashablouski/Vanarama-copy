#!/bin/bash -ex

# Environment Variables as Input:
#   $ECR_REPOSITORY_NAME - ECR repository name
#   $GITHUB_API_URL - github repository url
#   $ARTIFACT_TAG - github tag used for deployment (release-5488a22)
#   $GITHUB_PAT - github PAT token
#   $JIRA_API_TOKEN - Jira API Token

# Environment Variables as Output:
#   $JIRA_TICKETS - string of whitespace separated multiple JIRA tickets (e.g. "DIG-1 DIG-2 DIG-3")

ECR_TAG_PREFIX=$(echo $ARTIFACT_TAG | cut -d'-' -f1)
JIRA_TICKETS_ARRAY=()

# Extract Jira ticket numbers from commits between $ARTIFACT_TAG and previous tag

ecr_release_tags=$(aws ecr describe-images --repository-name $ECR_REPOSITORY_NAME \
    --query 'reverse(sort_by(imageDetails,& imagePushedAt))[*]' \
    | jq '[ .[] | select(.imageTags[0] | length>0) ]' \
    | jq "[ .[] | select(.imageTags[0] | startswith(\"${ECR_TAG_PREFIX}-\")) ]" \
    | jq '[ .[] | { "tag": .imageTags[0] } ]')

current_tag_index=$(echo $ecr_release_tags \
    | jq "map(.tag==\"$ARTIFACT_TAG\") | index(true)")

previous_tag_index=$((current_tag_index+1))
previous_tag_name=$(echo $ecr_release_tags \
    | jq ".[$previous_tag_index].tag" | tr -d \")

# extract jira refs from commits betweeen $previous_tag_name and $ARTIFACT_TAG


ARTIFACT_TAG_SHORT_SHA=$(echo $ARTIFACT_TAG | cut -d'-' -f2)
PREVIOUS_TAG_SHORT_SHA=$(echo $previous_tag_name | cut -d'-' -f2)
echo Comparing $PREVIOUS_TAG_SHORT_SHA...$ARTIFACT_TAG_SHORT_SHA

JIRA_TICKET_NUMBERS=($(curl -s \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token $GITHUB_PAT" \
    "$GITHUB_API_URL/compare/$PREVIOUS_TAG_SHORT_SHA...$ARTIFACT_TAG_SHORT_SHA" \
    | jq '.commits' | jq '.[].commit.message' | tr -d \" | cut -d'\' -f1 \
    | grep -P '(?i)DIG[-\s][\d]+' -o | grep -P '[\d]+' -o)) || true

for jira_ticket_number in "${JIRA_TICKET_NUMBERS[@]}"; do
    JIRA_TICKETS_ARRAY+=("DIG-$jira_ticket_number")
done

jira_refs_list_unique=($(printf '%s\n' "${JIRA_TICKETS_ARRAY[@]}" | sort -u))

# filter non-existing jira tickets

existing_jira_refs=()

for issue_id in "${jira_refs_list_unique[@]}"; do

    issue_api_response=$(curl -s \
        --url "https://autorama.atlassian.net/rest/api/3/issue/$issue_id" \
        --user "devops@vanarama.co.uk:${JIRA_API_TOKEN}" \
        --header 'Accept: application/json')

    if [[ "$(echo $issue_api_response | jq 'has("errorMessages")')" == "true" ]]; then
        echo "Issue do not exist: $issue_id; $issue_api_response"
    elif [[ "$(echo $issue_api_response | jq '.fields.project.key' | tr -d \")" != "DIG" ]]; then
        echo "Issue do not exist in Digital project - $issue_id"
        echo "issue belongs to project: $(echo $issue_api_response | jq '.fields.project')"
    else
        existing_jira_refs+=($issue_id)
    fi
done


# export output variables
export JIRA_TICKETS_STRING=${existing_jira_refs[*]}