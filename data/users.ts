import { User } from "../types";

/**
 * This array simulates a database consisting of a list of users.
 * After signing up with your auth solution (e.g. GitHub, Auth0)
 * place your user info in an object, with the email address you used
 * as the id.
 * The groupIds are the names of the groups the user is part of.
 * Group info is in /data/groups.ts
 */
export const users: User[] = [
  /*
  {
    id: "[YOUR EMAIL ADDRESS]",
    name: "[YOUR DISPLAY NAME]",
    avatar: "https://liveblocks.io/avatars/avatar-0.png",
    groupIds: ["product", "engineering", "design"],
  },
  */
  {
    id: "contact@jtlr.org",
    name: "CAJCS Student",
    avatar: "https://cathedral-school.com/wp-content/uploads/2017/03/logo.png",
    groupIds: ["product", "engineering", "design"],
  },
  {
    id: "contact+1@jtlr.org",
    name: "CAJCS Teacher",
    avatar: "https://cathedral-school.com/wp-content/uploads/2017/03/logo.png",
    groupIds: ["engineering"],
  },
  {
    id: "jtlr@group.com",
    name: "Other",
    avatar: "https://www.jtlrgroup.com/wp-content/uploads/2022/05/jtlr.svg",
    groupIds: ["engineering", "design"],
  }
];
