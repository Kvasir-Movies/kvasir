import React, { useState, SyntheticEvent } from "react";
import { Dropdown, DropdownProps, Input } from "semantic-ui-react";

import { searchUsers } from "../network/requests";
import { User } from "../types";

const UserPicker = ({
  sessionUser,
  selectedEmails,
  setSelectedEmails
}: {
  sessionUser: User;
  selectedEmails: Array<string>;
  setSelectedEmails: (emails: Array<string>) => void;
}): JSX.Element => {
  const emailsToOptions = (
    optionEmails: Array<string>,
    selectedEmails: Array<string>
  ) => {
    const uniqueEmails = new Set(optionEmails);
    selectedEmails.forEach(email => {
      uniqueEmails.add(email);
    });

    const options = [];
    for (const email of uniqueEmails) {
      options.push({
        key: email,
        text: email,
        value: email
      });
    }
    return options;
  };

  const defaultEmails = sessionUser.friends.map(friend => friend.email);
  const [options, setOptions] = useState(
    emailsToOptions(defaultEmails, selectedEmails)
  );

  const handleOnSearchChange = async (
    event: SyntheticEvent,
    data: { searchQuery: string }
  ) => {
    let emailOptions = defaultEmails;
    if (data.searchQuery) {
      const users = await searchUsers(data.searchQuery);
      emailOptions = users.map((user: User) => user.email);
    }
    setOptions(emailsToOptions(emailOptions, selectedEmails));
  };

  const handleOnChange = (event: SyntheticEvent, data: DropdownProps) => {
    if (data.value != null) {
      const values = data.value as Array<string>;
      setSelectedEmails(values.slice(0));
      setOptions(emailsToOptions(defaultEmails, values.slice(0)));
    }
  };

  return (
    <Dropdown
      clearable
      fluid
      multiple
      onChange={handleOnChange}
      onSearchChange={handleOnSearchChange}
      options={options}
      placeholder="Search for users..."
      search
      selection
    />
  );
};

export default UserPicker;
