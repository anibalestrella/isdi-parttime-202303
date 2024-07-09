import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function SelectDate() {
    const [selected, setSelected] = useState(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDateDisabled = (date) => {
        date.setHours(0, 0, 0, 0);
        return date > today;
    };

    return (
        <div className="w-full">

            <DayPicker
                disabled={[
                    { before: new Date(1900, 0, 1) },
                    { after: today },
                ]}
                selected={selected}
                onDayClick={(day, modifiers) => {
                    if (modifiers.disabled) {
                        return;
                    }
                    setSelected(day);
                    console.log('Selected day:', day);


                }}
                classNames={{
                    caption: 'flex justify-between items-center',
                    day_selected: 'bg-red-100',
                    day_disabled: 'text-gray-200',
                    caption_label: 'uppercase',
                    months: 'w-full bg-gray-300 rounded-xl p-4',
                    table: 'w-full',
                    // button_reset:'',
                    // head: '',
                    // nav: '',
                    // day: 'cursor-pointer ',
                    // button: 'hover:text-gray-400',
                }}
            />
        </div>
    );
}
