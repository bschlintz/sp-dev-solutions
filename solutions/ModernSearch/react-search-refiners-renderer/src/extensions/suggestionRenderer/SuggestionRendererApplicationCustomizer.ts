import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'SuggestionRendererApplicationCustomizerStrings';
import ISuggestionService from '../../services/SuggestionService/ISuggestionService';
import { SuggestionService, ISuggestEvent } from '../../services/SuggestionService/SuggestionService';
import SearchSuggestion from './SearchSuggestion/SearchSuggestion';

export interface ISuggestionRendererApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SuggestionRendererApplicationCustomizer
  extends BaseApplicationCustomizer<ISuggestionRendererApplicationCustomizerProperties> {

    private _resultService: ISuggestionService;

    @override
    public onInit(): Promise<void> {
        this._resultService = new SuggestionService();
        this.onChangeHappened.bind(this);
        this._resultService.registerRenderer(this.componentId, 'SuggestionRenderer', 'QueryList', this.onChangeHappened);
        return Promise.resolve();
    }

    public onChangeHappened(e: ISuggestEvent) {
        const resultDisplay = React.createElement(SearchSuggestion, {
            searchSuggestions: e.suggestions,
            componentId: e.rendererId,
        });
        let node = document.getElementById(e.mountNode);
        if (node) {
            ReactDOM.render(resultDisplay, node);
        }
    }
}
