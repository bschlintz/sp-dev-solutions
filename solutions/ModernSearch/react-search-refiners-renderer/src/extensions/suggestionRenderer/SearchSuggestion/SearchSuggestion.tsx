import * as React from 'react';
import { ISearchSuggestionProps } from './ISearchSuggestionProps';
import styles from './SearchSuggestion.module.scss';
import * as strings from 'SuggestionRendererApplicationCustomizerStrings';

class SearchSuggestion extends React.Component<ISearchSuggestionProps, {}> {
  render() {
    return (
      <div className={styles.suggestionContainer}>
        {this.props.searchSuggestions.suggestions.map(suggestion => {
          return (
            <div>
              {suggestion.text}
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchSuggestion;
