import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Contact } from "./Model/Contact";
import FakerService from "./Service/FakerService";

interface IContact {
  Data: Contact;
  isSelected: boolean;
}

const App = () => {
  const [ContactList, setContactList] = useState<IContact[]>([]);
  const [SearchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const RamList: Contact[] = FakerService.FakeDataArray(
      () => {
        return FakerService.Contact();
      },
      10,
      20
    );

    let ContactList: IContact[] = [];
    RamList.forEach((item) => {
      let tempContact: IContact = { Data: item, isSelected: false };
      ContactList.push(tempContact);
    });

    console.log(
      "🚀 ~ file: App.tsx:32 ~ useEffect ~ ContactList:",
      ContactList
    );
    setContactList(ContactList);
  }, []);

  const wildCardSearch = (obj: any, keyword: string) => {
    for (const [key, value] of Object.entries(obj)) {
      if (JSON.stringify(value).toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  const SearchBox = () => {
    const OnInput = (value: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value.target.value);
    };

    return (
      <input
        type="text"
        placeholder="Search Here"
        value={SearchValue}
        onChange={OnInput}
        className="SearchBoxContainer"
      />
    );
  };

  const ContactRenderer = (item: IContact, index: number) => {
    const contact = item.Data;

    const OnClick = () => {
      let tempContactList = JSON.parse(JSON.stringify(ContactList));
      tempContactList[index].isSelected = !tempContactList[index].isSelected;
      setContactList(tempContactList);
    };

    return (
      <div
        key={index}
        className="ContactContainer"
        onClick={() => {
          OnClick();
        }}
      >
        <div>{contact.Name}</div>
        {item.isSelected && (
          <>
            <div>Phone Number: {contact.PhoneNum}</div>
            <div>Email: {contact.Email}</div>
            <div>Address: {contact.Address}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="BG">
      {SearchBox()}
      {ContactList.filter((item) => wildCardSearch(item.Data, SearchValue)).map(
        (item, index) => {
          return ContactRenderer(item, index);
        }
      )}
    </div>
  );
};

export default App;
