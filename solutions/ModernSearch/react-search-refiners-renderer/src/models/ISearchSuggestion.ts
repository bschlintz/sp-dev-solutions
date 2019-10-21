export interface ISearchSuggestions {
  suggestions: ISearchSuggestion[];
}

export interface ISearchSuggestion {
  text: string;
  description?: string;
  icon?: string;
  type: SearchSuggestionType;
}

export type SearchSuggestionType = {
  Content;
  Person;
}
