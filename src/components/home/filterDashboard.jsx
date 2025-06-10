import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { BiSearch } from 'react-icons/bi';
import { useTableStore } from '../../stores/useTableStore';

export default function FilterDashboard({ search, setSearch, peopleCount, setPeopleCount, tableNumber, setTableNumber }) {
  const { tables } = useTableStore();
  return (
    <div className="flex items-center justify-between gap-4 w-full pb-3 pt-2">
      <div className="flex-1 max-w-md flex items-center ml-5">
        <BiSearch className='size-6' />
        <Input
          placeholder="Taom qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none border-0"
        />
      </div>

      <div className="flex items-center gap-4 mr-2">
        <div className="w-32">
          <Input
            placeholder="Odamlar soni"
            type="number"
            min="0"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e' || e.key === '+') {
                e.preventDefault();
              }
            }}
            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
          />

        </div>

        <Select value={tableNumber} onValueChange={setTableNumber}>
          <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Stol raqami" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((num) => (
              <SelectItem key={num.id} value={`${num.id}`}>
                Stol {num.number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}