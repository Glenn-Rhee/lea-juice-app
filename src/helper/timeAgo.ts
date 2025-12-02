export function timeAgo(dateString: Date) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) {
    return `${Math.floor(diff)} seconds ago`;
  }

  const minutes = diff / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  }

  const days = hours / 24;
  if (days < 30) {
    return `${Math.floor(days)} days ago`;
  }

  const months = days / 30;
  if (months < 12) {
    return `${Math.floor(months)} months ago`;
  }

  const years = months / 12;
  return `${Math.floor(years)} years ago`;
}
