import React from "react";
import { RecruiterProfile } from "../pages/profile/RecruiterProfile";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dui massa, hendrerit vitae maximus sed, fringilla sed nisi. Mauris auctor neque dui, sit amet feugiat sapien bibendum aliquam. Duis tellus sem, euismod eget aliquam et, convallis ut orci. Fusce at lorem porta, sollicitudin nulla ullamcorper, suscipit purus. Praesent suscipit iaculis accumsan. Cras et odio mi. Aenean et nisl vel mi interdum ultricies dignissim et neque. In laoreet gravida quam in porttitor. Quisque in luctus est. Ut tellus nunc, suscipit nec luctus vel, facilisis eleifend odio. Vestibulum nec libero eget lacus porttitor viverra nec vel est. Mauris a ligula nisi. Etiam auctor tincidunt ante ac ornare. Nulla mattis posuere auctor. Donec euismod tincidunt nibh, ac cursus odio dictum eget.
Mauris nec mi sagittis, ultrices nibh in, pharetra ante. Nunc nec lorem faucibus, tempus sem eu, gravida ex. Cras non quam ac dolor mollis vulputate non lobortis sapien. Donec pulvinar, ex sed pulvinar viverra, velit mauris tincidunt felis, sed convallis lectus tortor porttitor ipsum. Phasellus non tincidunt orci. Mauris feugiat est erat, quis porta sem pretium ac. In eget vestibulum tellus. In consequat vitae erat non varius.

Integer ac varius est, at semper magna. Pellentesque sed lorem a leo posuere elementum. Sed at pretium diam. Praesent vitae risus sit amet turpis elementum pharetra. Praesent a ante non felis blandit gravida non egestas diam. Nam tempor nisl orci. Nullam rutrum suscipit eros, sed pellentesque tellus. Ut maximus lacinia magna, vitae convallis diam eleifend vitae. Suspendisse mollis, mi id elementum iaculis, urna mauris auctor purus, et commodo ipsum urna sed tortor. Aenean sit amet purus porttitor, laoreet diam quis, venenatis velit. Sed rutrum euismod euismod. Nullam sit amet dictum risus. Etiam sit amet ex metus. Fusce ut efficitur libero, id commodo ligula. Sed sit amet tempus sem.
Fusce lobortis fringilla enim, vel convallis urna malesuada nec. Maecenas auctor neque sed suscipit malesuada. Aliquam sodales ante dolor, nec semper eros blandit non. Ut pellentesque nunc id nisl auctor posuere. Cras id convallis enim. Sed porttitor, metus non sodales volutpat, quam enim condimentum mauris, sed sodales justo ligula vel eros. Fusce tincidunt tincidunt augue ut rhoncus. In et quam quis arcu facilisis porttitor. Integer in lorem ut tellus condimentum condimentum. Praesent dapibus sapien euismod eros pretium, eget laoreet risus consectetur.
Curabitur gravida dapibus risus lacinia facilisis. Sed hendrerit consequat est et venenatis. Curabitur ut lorem elit. Praesent interdum in quam vel tempor. Pellentesque iaculis turpis sit amet bibendum porta. Nunc fringilla velit eu orci vehicula, sit amet efficitur arcu vulputate. Sed arcu magna, pulvinar vitae magna ut, accumsan pharetra leo. Mauris consectetur porttitor rhoncus.`;

const props = {
	companyName: "Testful",
	recruiterName: "Elizabeth Sharpe",
	description: lorem,
	phone: "+44 070 6890 7312",
	email: "ElizabethSharpe@rhyta.com",
	address: "135  Walden Road, GREENBURN",
};

export default {
	readOnly: <RecruiterProfile {...props} isReadOnly={true} />,
	editable: <RecruiterProfile {...props} isReadOnly={false} />,
};
