import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { faker } from "@faker-js/faker";

const Page = () => {
	const [mapping, setMapping] = useState({});
	const [data, setData] = useState([]);
	const [sortBy, setSortBy] = useState("title");
	const [statuses, setStatuses] = useState(new Set());
	const [users, setUsers] = useState(new Set());
	const [priorities, setPriorities] = useState(new Set());
	const [categories, setCategories] = useState(["All"]);
	const [currentCategory, setCurrentCategory] = useState("");
	const apiUrl = "https://apimocha.com/quicksell/data";
	const priorityMapping = {
		4: "Urgent",
		3: "High",
		2: "Medium",
		1: "Low",
		0: "No Priority",
	};
	

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(apiUrl);
				for (let user of response.data.users) {
					const obj = {};
					obj[user.id] = user.name;
					setMapping((mapping) => ({
						...mapping,
						...obj,
					}));
				}
				setData(response.data.tickets);
				for (let tickets of response.data.tickets) {
					const statusSet = statuses.add(tickets.status);
					setStatuses(statusSet);
					const prioritySet = priorities.add(
						parseInt(tickets.priority)
					);
					setPriorities(prioritySet);
					const userSet = users.add(tickets.userId);
					setUsers(userSet);
				}
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}, []);

	const sortTickets = (key) => {
		const sortedTickets = [...data].sort((a, b) => {
			if (key === "title") {
				return a.title.localeCompare(b.title);
			}
			if (key === "priority") {
				return a.priority - b.priority;
			}
			return 0;
		});
		setData(sortedTickets);
	};

	const handleSortChange = (event) => {
		const selectedValue = event.target.value;
		setSortBy(selectedValue);
		sortTickets(selectedValue);
	};

	const handleGroupByChange = (event) => {
		const selectedValue = event.target.value;
		if (selectedValue === "Priority") {
			setCurrentCategory("priority");
			setCategories([...priorities].sort().reverse());
		} else if (selectedValue === "Status") {
			setCurrentCategory("status");
			setCategories([...statuses]);
		} else if (selectedValue === "User") {
			setCurrentCategory("userId");
			setCategories([...users].sort());
		} else {
			setCurrentCategory("");
			setCategories([]);
		}
	};

	return (
		<div>
		{/* <select>
		<label>Display</label> */}
		<div className="navbar p-5">
			<select
				value={sortBy}
				onChange={handleSortChange}
				className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-black-500 text-base pl-3 pr-10 bg-gray-300 hover:bg-gray-400"
			>
				<option value="title">Sort By</option>
				<option value="title">Title</option>
				<option value="priority">Priority</option>
			</select>
			<select
				onChange={handleGroupByChange}
				className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-black-500 text-base pl-3 pr-10 bg-gray-300 hover:bg-gray-400"
			>	
				<option>Group By</option>
				<option>Priority</option>
				<option>Status</option>
				<option>User</option>
			</select>
		</div>
		{/* </select> */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
{categories.map((category) => (
    <div key={category} className="m-5">
        {currentCategory === "userId" ? (
            <div>
                <img
                    className="w-5 h-5 rounded-full float-left"
                    src={faker.image.avatar()}
                    alt="user"
                />
                <h1 className="font-bold text-base text-opacity-5 pl-6 pb-4">
                    {mapping[category]} ({currentCategory === "" ? data.length : data.filter((ticket) => ticket[currentCategory] === category).length})
                </h1>
            </div>
        ) : currentCategory === "priority" ? (
            <h1 className="font-bold text-opacity-5">
                {priorityMapping[category]} ({currentCategory === "" ? data.length : data.filter((ticket) => ticket[currentCategory] === category).length})
            </h1>
        ) : (
            <h1 className="font-bold text-opacity-5">
                {category} ({currentCategory === "" ? data.length : data.filter((ticket) => ticket[currentCategory] === category).length})
            </h1>
        )}
        {data
            .filter((ticket) => {
                if (!currentCategory) {
                    return true;
                } else {
                    return ticket[currentCategory] === category;
                }
            })
            .map((ticket) => (
                <div className="mb-3" key={ticket.id}>
                    <Card data={ticket} />
                </div>
            ))}
    </div>
))}


			</div>
		</div>
	);
};

export default Page;