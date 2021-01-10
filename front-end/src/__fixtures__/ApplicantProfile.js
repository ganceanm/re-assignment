import React from "react";
import { ApplicantProfile } from "../pages/profile/ApplicantProfile";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse egestas tristique auctor. Fusce ultrices lectus elit, nec ultrices sem imperdiet eget. 

Fusce lobortis fringilla enim, vel convallis urna malesuada nec. Maecenas auctor neque sed suscipit malesuada. Aliquam sodales ante dolor, nec semper eros blandit non. Ut pellentesque nunc id nisl auctor posuere. Cras id convallis enim. Sed porttitor, metus non sodales volutpat, quam enim condimentum mauris, sed sodales justo ligula vel eros. Fusce tincidunt tincidunt augue ut rhoncus. In et quam quis arcu facilisis porttitor. Integer in lorem ut tellus condimentum condimentum. Praesent dapibus sapien euismod eros pretium, eget laoreet risus consectetur.
Aenean pretium sollicitudin congue. Nulla purus tortor, interdum eu efficitur ac, elementum nec lectus. 
Aenean rhoncus euismod justo, non rutrum diam varius sed. Duis rhoncus massa ut maximus tristique. 
Fusce iaculis feugiat quam. Pellentesque lacus ante, condimentum a sem eget, vestibulum tincidunt ex.`;

const props = {
	name: "Meghan J. Ammons",
	aboutMe: lorem,
	phone: "804-405-8318",
	email: "MeghanJAmmons@rhyta.com",
	address: "1344 Melody Lane, Glen Allen, VA 23060",
	education: `Bachelor of Communications, University of Seattle, Seattle",
OCTOBER 2015 - MAY 2020
${lorem}

High School Diploma, Hartwick High School, Seattle
OCTOBER 2010 - MAY 2015`,
	experience: `Customer Service Representative, AT&T, Seattle
OCTOBER 2015 - MAY 2020
${lorem}

Customer Service Representative, Gold Coast Hotel, Seattle
OCTOBER 2015 - MAY 2020
${lorem}`,
	skills: "communication, marketing, negotiations, english language",
	hobbies: "cliff diving, candle making, comic book collecting, archery",
};

export default {
	readOnly: <ApplicantProfile {...props} isReadOnly={true} />,
	editable: <ApplicantProfile {...props} isReadOnly={false} />,
};
