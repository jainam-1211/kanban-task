import React from "react";
import { faker } from "@faker-js/faker";
const Card = (props) => {
	return (
		<div>
			<div className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
				<div className="flex justify-between">
					<h5 className="mb-2 text-base font-normal tracking-tight text-gray-900">
						{props.data.id}
					</h5>
					<div className="flex-shrink-0">
						<img
							className="w-8 h-8 rounded-full"
							src={faker.image.avatar()}
							alt="user"
						/>
					</div>
				</div>
				<div className="flex items-center">
				<input type="checkbox" class="mr-2"></input>
				<p className="font-bold text-gray-700">{props.data.title}</p>
				</div>
				<div className="mb-2 text-base font-normal tracking-tight text-gray-900 ml-5">{props.data.tag}</div>
				<i class="fa-solid fa-triangle-exclamation"></i>
			</div>
		</div>
	);
};

export default Card;
