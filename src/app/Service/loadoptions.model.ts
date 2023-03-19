export class LoadOptions {
  companyId: string;
  requireTotalCount: boolean;
  requireGroupCount: boolean;
  isCountQuery: boolean;
  skip: number;
  take: number;
  sort: any; //SortingInfo[];
  group: any; //GroupingInfo[];
  filter: any;
  totalSummary: any; // SummaryInfo[];
  groupSummary: any; // SummaryInfo[];
  select: any;

  constructor(item: any) {
      this.companyId = item.companyId;
      this.requireTotalCount = item.requireTotalCount !== undefined ? item.requireTotalCount : false;
      this.requireGroupCount = item.requireGroupCount !== undefined ? item.requireGroupCount : false;
      this.isCountQuery = item.isCountQuery !== undefined ? item.isCountQuery : false;

      this.skip = item.skip !== undefined ? item.skip : 0;
      this.take = item.take !== undefined ? item.take : 10;

      this.sort = item.sort !== null ? JSON.stringify(item.sort) : undefined;
      this.group = item.group !== null ? JSON.stringify(item.group) : undefined;
      this.totalSummary = item.totalSummary !== undefined ? JSON.stringify(item.totalSummary) : undefined;
      this.groupSummary = item.groupSummary !== undefined ? JSON.stringify(item.groupSummary) : undefined;
      this.select = item.select !== undefined ? JSON.stringify(item.select) : undefined;
      if (item.searchValue !== null && item.searchValue !== undefined) {
          var search = [];
          var isArray = Array.isArray(item.searchExpr);
          if (item.searchExpr.length > 1 && isArray) {
              for (var i = 0; i < item.searchExpr.length; i++) {
                  var s = [item.searchExpr[i], item.searchOperation, item.searchValue];
                  if (i < item.searchExpr.length - 1) {
                      search.push(s);
                      search.push('or');
                  } else {
                      search.push(s);
                  }
              }
          } else {
              search = [item.searchExpr, item.searchOperation, item.searchValue];
          }
          this.filter = JSON.stringify(search);
      }
      else {
          this.filter = item.filter !== undefined ? JSON.stringify(item.filter) : undefined;
      }
  }
}
