declare namespace Common {
  type OrderType = 0 | 1;
  type FilterLogicalOperator = 0 | 1;
  type FilterConditionOperator = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  export interface DataGridModel {
    pageInfo?: PageModel;
    orderInfo?: OrderModel;
    searchInfo?: SearchModel;
    filterInfo?: FilterModel;
  }
  export interface PageModel {
    pageSize?: number;
    pageNo?: number;
    total?: A;
    start?: number;
  }
  interface OrderModel {
    columnName?: string;
    orderType?: OrderType;
  }
  interface SearchModel {
    searchOperator?: FilterLogicalOperator;
    searchRule?: SearchRule[];
  }
  interface SearchRule {
    keyWord?: string;
    searchColumns?: string[];
  }
  interface FilterModel {
    filterOperator?: FilterLogicalOperator;
    filterCondition?: FilterConditionModel[];
  }
  interface FilterConditionModel {
    columnName?: string;
    operator?: FilterConditionOperator;
    values?: A[];
    filterStartTime?: DateTime;
    filterEndTime?: DateTime;
  }
  export interface IDefaultResponse {
    state?: number;
    errorCode: number;
    message?: string;
    result?: A;
    hasPermission?: boolean;
    correlatedId: A;
    isView: boolean;
  }
}
