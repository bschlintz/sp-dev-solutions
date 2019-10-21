import { ISearchSuggestions } from "../../models/ISearchSuggestion";
import { IRenderer } from "./SuggestionService";

export default interface ISuggestionService {

    /**
     * Persists the results to the local storage and fires and update event.
     * @param results The new results
     * @param rendererId The Id of the custom action chosen to render the resultdata.
     * @param mountNode The name of the html node which the renderers should use to display the results
     */
    updateSuggestionData(results: ISearchSuggestions, rendererId: string, mountNode: string);

    /**
     * Registerer the renderer as an renderer to be picked up by the search-refiners webpart.
     * @param rendererId The id of the renderer
     * @param rendererName The name that should be displayed in the search-refiners webpart
     * @param rendererIcon The office-ui-fabric icon to be displayed.
     * @param callback The function that should run whenever the renderer recieves data
     */
    registerRenderer(rendererId: string, rendererName: string, rendererIcon: string, callback: (e) => void /*, customFields?:string[]*/);

    /**
     * Get all registered renderers on the current page.
     */
    getRegisteredRenderers(): IRenderer[];

    /**
     * The current results
     */
    results: ISearchSuggestions;

    /**
     * Indicates if results are loading
     */
    isLoading: boolean;
}
