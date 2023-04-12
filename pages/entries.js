import React, { Component } from "react";
import entries from "./entries.json";
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';

export default function Log() {
  var list = [];
  entries.forEach((entry, i) => {
    list.push(
      <CAccordionItem itemKey={i}>
        <CAccordionHeader>Session {entry.session}</CAccordionHeader>
        <CAccordionBody>{entry.content}</CAccordionBody>
      </CAccordionItem>
    )
  });
    return list;
}
