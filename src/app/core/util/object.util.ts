export function cleanObjectProperties<K>(obj: K) {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value == null) {
      delete obj[key as keyof K];
    }
  });
}
