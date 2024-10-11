import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import Icon from "../Icon";

interface SearchInputProps {
  placeholder?: string; // Add placeholder as an optional prop
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Search submitted:", searchInput);
        setSearchInput("");
      }}
      className="relative"
    >
      <Input
        classNames={{
          base: "h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder={placeholder} // Pass the placeholder prop here
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        size="sm"
        type="search"
        startContent={
          <button type="submit">
            <Icon name="search" />
          </button>
        }
      />
    </form>
  );
};

export default SearchInput;
