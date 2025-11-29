export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  const dateOfDay = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${hour}.${minute} - ${dateOfDay}`;
}
