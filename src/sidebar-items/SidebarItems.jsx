import { RiArrowRightDoubleFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

export const SidebarItems = [
    {
        title: "Upcoming",
        icon: <RiArrowRightDoubleFill />,
        num: 12,
        index:0
    },
    {
        title: "Today",
        icon: <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em">
            <path
                fillRule="evenodd"
                d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-3 1a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z"
            />
        </svg>,
        num: 5,
        index:1
    },
    {
        title: "Calender",
        icon: <SlCalender />,
        num: 12,
        index:2
    },
]

export const SidebarLists = [
    {
        title: "Personal",
        num: 3,
        clr: "red",
        index:3
    },
    {
        title: "Work",
        num: 3,
        clr: "rgb(0, 255, 247)",
        index:4
    }
]

export const others = [
    {
        title: "Settings",
        icon: <IoSettingsOutline />,
        index:5

    },
    // {
    //     title: "Logout",
    //     icon: <svg
    //     viewBox="0 0 24 24"
    //     fill="currentColor"
    //     height="1em"
    //     width="1em">
    //     <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
    //   </svg>,

    // }
]
