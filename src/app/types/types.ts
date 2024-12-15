export interface IRoute {
    icon: String,
    menuTitle: String,
    route: String
}

export interface IIncome {
    incid: number,
    income_name: String,
    amount: String,
    date: String,
    mode: String,
    reason: String,
    income_by: String,
    bankname: String,
    chequeordd: number,
    dateinbank: String,
    details: String,
}

export interface IIncomeType {
    typeid: number,
    typename: String,
}

export interface IExepnse {
    expid: number,
    expense_name: String,
    amount: String,
    date: String,
    mode: String,
    reason: String,
    expense_by: String,
    bankname: String,
    chequeordd: number,
    dateinbank: String,
    details: String,
}

export interface IExpenseType {
    etypeid: number,
    etypename: String,
}

export interface IReport {
    adjusted_final_expense: number,
    date: String,
    final_expense: number,
    final_income: number,
    total_expense: number,
    total_income: number,
    total_opening_balance: number
}
