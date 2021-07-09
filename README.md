# Record Home

An Experience Cloud component that allows for more customization than the OOTB Record Banner component.

The OOTB Record Banner is set using the Compact Layout of the object; the compact layout assignment is done by record type - we cannot change the compact layout in experience cloud without also changing the internal view for that record type.
This LWC lets us specify which fields to display instead of having to modify the compact layout of the record type for all users.

![Imgur](https://i.imgur.com/rQo2Gyy.png)

## 📦 Install

**via sfdx-cli**
`sfdx force:package:install --package 04t5e000000e1gWAAQ -u your@org.user`

**via url**
login and navigate to [`/packaging/installPackage.apexp?p0=04t5e000000e1gWAAQ`](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5e000000e1gWAAQ). Choose `Install for: Admin Only`.

## 🔨 Usage

1. Go to your community in Experience cloud
2. Go to a record detail page
3. Drag the component ``Record Home`` onto the page
4. Fill in the component parameters as needed

## ✨Features

### Supports Standard and Custom Objects

- This page can live on the record detail pages within Experience Cloud
  - Just specify the ``Record Id`` attribute as ``{!recordId}``
- If you wanted to display a known record across multiple pages, you could hardcode the Id and fields

### Specify your own fields

- You have the ability to display specific fields from the record instead of being tied to a compact layout.

### Specify your Icon

- You have the ability to toggle the display of an icon (leave it blank to not display one).
- Reference the list of supported SLDS icons at https://www.lightningdesignsystem.com/icons/
