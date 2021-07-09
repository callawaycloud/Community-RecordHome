import { LightningElement, api, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { getRecord } from "lightning/uiRecordApi";

export default class CommunityRecordHome extends LightningElement {
  @api recordId;
  @api objectApiName;
  @api recordNameField;
  @api fieldApiNames; // ; separated (we have logic to handle white space and commas as well)
  @api sldsIcon; // https://www.lightningdesignsystem.com/icons/ (can be blank)

  objectInfo;
  record;

  // Get info needed to render the UI labels
  @wire(getObjectInfo, { objectApiName: "$objectApiName" })
  wiredObjectInfo({ error, data }) {
    if (error) {
      const message = this.getWireError(error);
      this.displayToast("Error loading objectInfo", message, "error");
    } else if (data) {
      this.objectInfo = data;
    }
  }

  // Get info needed to render the record's values
  @wire(getRecord, { recordId: "$recordId", fields: "$fieldsToRetrieveArray" })
  wiredRecord({ error, data }) {
    if (error) {
      const message = this.getWireError(error);
      this.displayToast("Error loading record", message, "error");
    } else if (data) {
      this.record = data;
    }
  }

  getWireError(error) {
    let message = "Unknown error";
    if (Array.isArray(error.body)) {
      message = error.body.map((e) => e.message).join(", ");
    } else if (typeof error.body.message === "string") {
      message = error.body.message;
    }
    return message;
  }

  displayToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
      })
    );
  }

  // Take the field api names and return the wire schema needed to retrieve these fields of the current record
  get fieldsToRetrieveArray() {
    let fieldsToRetrieveArray = [];

    // At this time, we only need to query for the record name field
    // for (let field of this.fieldApiNamesSplit) {
    //   fieldsToRetrieveArray.push(this.objectApiName + "." + field);
    // }

    if (this.recordNameField) {
      fieldsToRetrieveArray.push(
        this.objectApiName + "." + this.recordNameField
      );
    }

    return fieldsToRetrieveArray;
  }

  get fieldApiNamesSplit() {
    return this.fieldApiNames.replace(/\s|,/g, ";").split(";");
  }

  get objectLabel() {
    return this.objectInfo?.label;
  }

  get recordName() {
    return this.record?.fields[this.recordNameField]?.value;
  }
}
