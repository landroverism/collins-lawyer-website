import { v } from "convex/values";

export default {
  providers: [
    {
      domain: "http://localhost:5173",
      applicationID: "convex",
      userFields: {
        email: v.string(),
        password: v.string(),
      },
    },
  ],
};
