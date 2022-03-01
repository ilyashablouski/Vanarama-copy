export function formatQueryVariables(variables: Record<string, any>) {
  return JSON.stringify(variables || {}, null, 4);
}
