import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Dropdown = ({
  dropdownItems,
  selectedValues,
  onValueChange,
  selectMultiple,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    let newSelectedValues;

    if (item === "All") {
      newSelectedValues = [];
    } else if (selectMultiple) {
      if (selectedValues.includes(item)) {
        newSelectedValues = selectedValues.filter((value) => value !== item);
      } else {
        newSelectedValues = [...selectedValues, item];
      }
    } else {
      newSelectedValues = [item];
    }
    onValueChange(newSelectedValues);
  };

  const displayValue =
    selectedValues.length > 0 ? selectedValues.join(", ") : "All";

  return (
    <>
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex w-56 cursor-pointer items-center justify-between rounded-md border bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-100">
            {selectMultiple
              ? displayValue
              : selectedValues.length > 0
                ? selectedValues[0]
                : "Select an item"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white shadow-lg">
          {dropdownItems &&
            dropdownItems.length > 0 &&
            dropdownItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className={`hover:bg-gray-100 ${selectedValues.includes(item) ? "bg-gray-200" : ""}`}
                onClick={() => handleSelect(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
