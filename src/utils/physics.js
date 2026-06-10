export function aabb(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
