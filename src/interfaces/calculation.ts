import { ICBSize, IMaterial } from "./responseData";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *  CALCULATION STRUCTURE
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * */

export interface ICalculationOutcome {
    qty: number;
    pricePerQty?: number;
    receipt: IReceipt;
    draw: Array<IDraw>;
    calculated: ICalculated;
}


export interface ICalculated {
    sizes: Array<ICalculatedSizes>;
    materials: Array<ICalculatedMaterial>;
}

export interface ICalculatedSizes extends ICBSize {
    index: number;
}


export interface ICalculatedMaterial {
    data: IMaterial;
    index: number;
    mediumWidth: number;
    mediumHeight: number;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *  RECEIPT DATA STRUCTURE
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * */
export enum ReceiptItemTag {
    "materialCosts",
    "manufacturingCosts",
    "productionCosts",
    "costPrice",
    "resultCostPrice",
}
export interface IReceiptItem {
    label: string;
    avatar: string;
    description?: string;
    table?: Array<Array<string | number>>;
    value: number;
    unit: string;
    tags: Array<ReceiptItemTag>;
    type: "cost" | "sum"
}

export interface IReceiptMessage {
    type: "info" | "warning" | "success" | "error";
    message: string;
}

export interface IReceipt {
    items: Array<IReceiptItem>;
    messages: Array<IReceiptMessage>;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *  DRAW DATA STRUCTURE
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * */
export interface IDraw {
    name: string;
    mediumWidth: number;
    mediumHeight: number;
    sizes: Array<ICBSize & { 
        gap: number;
        qtyX: number;
        qtyY: number;
    } >;
}

