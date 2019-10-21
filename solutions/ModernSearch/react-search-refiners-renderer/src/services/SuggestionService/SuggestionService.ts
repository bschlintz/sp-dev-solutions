import ISuggestionService from "./ISuggestionService";
import { ISearchSuggestions } from "../../models/ISearchSuggestion";
import 'custom-event-polyfill';

export interface ISuggestEvent extends CustomEvent {
    rendererId?: string;
    suggestions?: ISearchSuggestions;
    mountNode?: string;
}

export interface IRenderer {
    id: string;
    name: string;
    icon: string;
}

export class SuggestionService implements ISuggestionService {
    private SEARCH_SUGGEST_EVENT_NAME: string = "pnp-spfx-search-suggest";
    private SUGGESTION_RENDERERS_OBJECT_NAME: string = "pnp-spfx-suggestion-renderers";
    private _suggestions: ISearchSuggestions;
    public get results(): ISearchSuggestions { return this._suggestions; }

    private _isLoading: boolean;
    public get isLoading(): boolean { return this._isLoading; }
    public set isLoading(status: boolean) { this._isLoading = status; }

    public updateSuggestionData(suggestions: ISearchSuggestions, rendererId: string, mountNode: string) {
        this._suggestions = suggestions;
        let searchEvent: ISuggestEvent = new CustomEvent(this.SEARCH_SUGGEST_EVENT_NAME);
        searchEvent.rendererId = rendererId;
        searchEvent.suggestions = suggestions;
        searchEvent.mountNode = mountNode;
        window.dispatchEvent(searchEvent);
    }

    public registerRenderer(rendererId: string, rendererName: string, rendererIcon: string, callback: (e: ISuggestEvent) => void): void {
        const newRenderer = {
            id: rendererId,
            name: rendererName,
            icon: rendererIcon,
        };
        if( window[this.SUGGESTION_RENDERERS_OBJECT_NAME] === undefined) {
            window[this.SUGGESTION_RENDERERS_OBJECT_NAME] = [newRenderer];
        } else {
            window[this.SUGGESTION_RENDERERS_OBJECT_NAME].push(newRenderer);
        }
        addEventListener(this.SEARCH_SUGGEST_EVENT_NAME, (e: ISuggestEvent) =>  this.handleNewDataRegistered(e, rendererId, callback));
    }

    public getRegisteredRenderers(): IRenderer[] {
        return window[this.SUGGESTION_RENDERERS_OBJECT_NAME];
    }

    private handleNewDataRegistered(e: ISuggestEvent, rendererId, callback: (e) => void ) {
        if(e.rendererId === rendererId) {
            callback(e);
        }
    }
}
