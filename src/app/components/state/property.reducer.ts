import { createReducer, on } from "@ngrx/store";
import { filter } from "./property.actions";
import { initialState } from "./property.state";
import { DashboardComponent } from "../dashboard/dashboard.component";
const _propertyReducer = createReducer(
    initialState,
    on(filter, (state) =>
    {
        return {
            ...state,
            propertyFilter:DashboardComponent.filteredData
        };
    })
);
export function propertyReducer(state: any, action: any)
{
    return _propertyReducer(state, action);
}