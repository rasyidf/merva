// decode base64 string
export const decodeBase64 = (input: string): Uint8Array => {
  const d = atob(input.trim());
  const b = new Uint8Array(d.length);
  for (let i = 0; i < d.length; i++) {
    b[i] = d.charCodeAt(i);
  }
  return b;
};

// encode data as base64 string
export const encodeBase64 = (input: any): string => btoa(String.fromCharCode(...new Uint8Array(input)));
