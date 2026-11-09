// Dates are stored as "YYYY-MM-DD", which Date parses as UTC. Formatting in UTC
// too keeps the 1st of a month from showing as the previous month in the Americas.
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
