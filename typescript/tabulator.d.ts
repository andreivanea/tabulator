declare namespace Tabulator {

    interface ColumnProperties {
        //General
        title: string;
        field: string;
        visible?: boolean;
        //Layout
        align?: "left" | "center" | "right";
        width?: number | string;
        minWidth?: number;
        frozen?: boolean;
        responsive?: number;
        tooltip?: boolean | string | ((cell: CellComponent) => string);
        cssClass?: string;
        rowHandle?: boolean;
        //Data Manipulation
        sorter?: "string" | "number" | "alphanum" | "boolean" | "data" | "time"
        | ((a: any, b: any, aData: Row, bData: Row, column: ColumnComponent, dir: "asc" | "desc", sorterParams: {}) => number),
        sorterParams?: { format?: string };
        formatter?: "plaintext" | "textarea" | "html" | "money" | "emial" | "image" | "link" | "tick" | "tickCross" | "color" | "star" | "progress" | "buttonTick" | "buttonCross" | "rownum" | "handle",
        formatterParams?: { decimal?: "string"; thousand?: string; symbol?: string; symbolAfter?: boolean; precision?: boolean | number; stars?: number; min?: number; max?: number; color?: string; };
        variableHieght?: boolean;
        editable?: (cell: CellComponent) => boolean;
        editor?: "input" | "textarea" | "number" | "tick" | "star" | "progress"
        | ((cell: CellComponent, onRendered: (callback: () => void) => void, success: (value: any) => void, cancel: (value: any) => void, editorParams: {}) => JQuery);
        editorParams?: {};
        mutator?: (value: any, data: any, type: "data" | "edit", mutatorParams, cell?: CellComponent) => any;
        mutateType?: "data" | "edit" | "all";
        mutatorParams?: {};
        accessor?: (value: any, data: any, accessorParams: {}) => any;
        accessorParams?: {};
        download?: boolean;
        topCalc?: "avg" | "max" | "min" | "sum" | "count" | ((values: Array<any>, data: Array<any>, calcParams: {}) => number);
        bottomCalc?: "avg" | "max" | "min" | "sum" | "count";
        topCalcParams?: {};
        bottomCalcParams?: {};
        //Cell Events
        cellClick?: any; //todo
        cellDblClick?: any; //todo
        cellContext?: any; //todo
        cellTap?: any; //todo
        cellDblTap?: any; //todo
        cellTapHold?: any; //todo
        //Column Header
        headerSort?: any; //todo
        headerClick?: any; //todo
        headerDblClick?: any; //todo
        headerContext?: any; //todo
        headerTap?: any; //todo
        headerDblTap?: any; //todo
        headerTapHold?: any; //todo
        tooltipHeader?: any; //todo
        editableTitle?: any; //todo
        headerFilter?: any; //todo
        HeaderFilterPlaceholder?: any; //todo
        headerFilterParams?: any; //todo
        headerFilterFunc?: any; //todo
        headerFilterFuncParams?: any; //todo
    }

    interface CellNavigation {
        next: () => boolean;
        prev: () => boolean;
        left: () => boolean;
        right: () => boolean;
        up: () => void;
        down: () => void;
    }

    interface CellComponent {
        getValue: () => any;
        getOldValue: () => any;
        getElement: () => null | JQuery;
        getRow: () => RowComponent;
        getData: () => {};
        getField: () => string;
        getColumn: () => ColumnComponent;
        setValue: (value: any, mutate?: boolean) => void;
        edit: () => void;
        nav: () => CellNavigation;
        checkHeight: () => void;
    }

//todo
    interface Row {
        table: Instance;// = parent.table -> ???
        parent: any;//RowManager or ColumnCalcs...
        data: {};
        type: "row";
        element: JQuery;
        extensions: {};
        cells: any;// = [];
        height: number;
        outerHeight: number;
        initialized: boolean;
        heightInitialized: boolean;
        setData: (data: any) => void;
        generateElement: () => void;
    }

    interface RowComponent {
        getData: () => {};
        getElement: () => JQuery;
        getCells: () => Array<CellComponent>;
        getCell: (columns: {} | string) => CellComponent; //todo: type of {}
        getIndex: () => any;
        delete: () => void;
        scrollTo: () => void;
        update: (data: {}) => void;
        normalizeHeight: () => void;
        select: () => void;
        deselect: () => void;
        toggleSelect: () => void;
    }

    interface ColumnComponent {
        type: string;
        getElement: () => JQuery;
        getDefinition: () => ColumnProperties;
        getField: () => string
        getCells: () => Array<CellComponent>;
        getVisibility: () => boolean;
        show: () => void;
        hide: () => void;
        toggle: () => void;
        delete: () => void;
    }

    interface ColumnManager { }
    interface RowManager { }
    interface FooterManager { }

    interface Keybindings {
        navPrev: string | boolean;
        navNext: string | boolean;
        navLeft: string | boolean;
        navRight: string | boolean;
        navUp: string | boolean;
        navDown: string | boolean;
        undo: string | boolean;
        redo: string | boolean;
        scrollPageUp: string | boolean;
        scrollPageDown: string | boolean;
        scrollToStart: string | boolean;
        scrollToEnd: string | boolean;
    }


    interface Instance {
        columnManager: ColumnManager;
        rowManager: RowManager;
        footerManager: FooterManager;
        browser: string;
        browserSlow: boolean

        //setup options
        options: Options
    }

    interface Options {
        //General Table Configuration
        height?: number | string;
        virtualDom?: boolean;
        virtualDomBuffer?: number;
        placeholder?: string | HTMLElement;
        footerElement?: JQuery;
        tooltips?: boolean | string | ((cell: CellComponent) => string);
        history?: boolean;// | (() => void);//todo
        keybindings?: boolean | Keybindings;
        locale?: string | boolean;
        langs?: {}; //todo
        downloadDataMutator?: (data: Array<any>) => Array<any>;
        //Columns
        colums?: Array<ColumnProperties>;
        fitColumns?: boolean;
        responsiveLayout?: boolean;
        columnMinWidth?: string | number;
        resizableColumns?: boolean;
        movableColumns?: boolean;
        tooltipsHeader?: boolean | ((column: ColumnComponent) => string);
        columnVertAlign?: string;
        headerFilterPlaceholder?: string;
        //Rows
        rowFormatter?: boolean | ((row: RowComponent) => void);
        groupBy?: string | ((data: Array<any>) => string) | Array<any>; //todo => array?
        groupHeader?: ((value: any, count: number, data: Array<any>) => string) | Array<any>; //todo => array?
        groupStartOpen?: boolean | ((value: any, count: number, data: Array<any>) => string) | Array<any>;//todo => array?
        addRowPos?: "bottom" | "top";
        selectable?: boolean | number | "highlight";
        selectableRollingSelection?: boolean;
        selectablePersistence?: boolean;
        selectableCheck?: (row: RowComponent) => boolean;
        movableRows?: boolean;
        //Data
        index?: string;
        data?: Array<any>;
        ajaxURL?: string | boolean;
        ajaxParams?: {};
        ajaxConfig?: string | {};
        ajaxFiltering?: boolean;
        ajaxSorting?: boolean;
        ajaxLoader?: boolean;
        ajaxLoaderLoading?: string;
        ajaxLoaderError?: string;
        //Initial Data Sorting
        initialSort?: Array<{ column: string; dir: "asc" | "desc" }>;
        //Pagination
        pagination?: string;
        paginationSize?: number;
        paginationElement?: JQuery;
        paginationDataReceived?: { last_page?: string; data?: string; };
        paginationDataSent?: {
            page?: string;
            size?: string;
            sort?: string;
            sort_dir?: string;
            filter?: string;
            filter_value?: string;
            filter_type?: string;
        };
        paginator?: (url: string, pageNo: number, pageSize: number, ajaxParams: {}) => string;
        //Persistent Layout
        persistentLayout?: boolean | "local" | "cookie";
        persistentLayoutID?: string;
        //Other
        progressiveRender?: boolean;
        //Callbacks & Events
        tableBuilding?: () => void;
        tableBuilt?: () => void;
        columnMoved?: (column: ColumnComponent) => void; //todo => columns
        columnResized?: (column: ColumnComponent) => void;
        columnVisibilityChanged?: (column: ColumnComponent, visible: boolean) => void;
        columnTitleChanged?: (column: ColumnComponent) => void;
        rowClick?: (e: Event, row: RowComponent) => void;
        rowDblClick?: (e: Event, row: RowComponent) => void;
        rowContext?: (e: Event, row: RowComponent) => void;
        rowTap?: (e: Event, row: RowComponent) => void;
        rowDblTap?: (e: Event, row: RowComponent) => void;
        rowTapHold?: (e: Event, row: RowComponent) => void;
        rowAdded?: (row: RowComponent) => void;
        rowUpdated?: (row: RowComponent) => void;
        rowDeleted?: (row: RowComponent) => void;
        rowMoved?: (row: RowComponent) => void;
        cellEditing?: (cell: CellComponent) => void;
        cellEditCancelled?: (cell: CellComponent) => void;
        cellEdited?: (cell: CellComponent) => void;
        dataLoading?: (data: Array<any>) => void;
        dataLoaded?: (data: Array<any>) => void;
        dataEdited?: (data: Array<any>) => void;
        htmlImporting?: () => void;
        htmlImported?: () => void;
        ajaxRequesting?: (url: string, params: {}) => void;
        ajaxResponse?: (url: string, params: {}, response: {}) => {};
        ajaxError?: (xhr, textStatus, errorThrown) => void;
        dataFiltering?: (filters: Array<any>) => void;
        dataFiltered?: (filters: Array<any>, rows: Array<RowComponent>) => void;
        dataSorting?: (sorters: Array<any>) => void;
        dataSorted?: (sorters: Array<any>, rows: Array<RowComponent>) => void;
        renderStarted?: () => void;
        renderComplete?: () => void;
        pageLoaded?: (pageNo: number) => void;
        localized?: (locale: string, lang: {}) => void;
        dataGrouping?: () => void;
        dataGrouped?: (groups: Array<any>) => void;
        groupVisibilityChanged?: (group: any, visible: boolean) => void;
        rowSelected?: (row: RowComponent) => void;
        rowDeselected?: (row: RowComponent) => void;
        rowSelectionChanged?: (data: Array<any>, rows: Array<RowComponent>) => void;
    }
}

interface JQuery {
    ////////////////
    //placeholder...
    ////////////////
}

interface JQuery {
    tabulator();
    tabulator(options?: Tabulator.Options);
    tabulator(option: string, data: any);
    tabulator<T extends keyof Tabulator.Instance>(option: T, data: Tabulator.Instance[T]);
    tabulator(option: "setData", url: string, urlData: {}, ajaxConfig: {});
}