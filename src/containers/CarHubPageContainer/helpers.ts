import { IAccordionItem } from 'core/molecules/accordion/AccordionItem';
import { GenericPageQuery_genericPage_sectionsAsArray_faqs_questionSets_questionAnswers as IFaqs } from '../../../generated/GenericPageQuery';

// eslint-disable-next-line import/prefer-default-export
export const accordionItemsMapper = (
  items: Array<IFaqs | null>,
): IAccordionItem[] =>
  items.map(item => ({
    id: item?.question || '',
    title: item?.question || '',
    children: item?.answer || '',
  }));
