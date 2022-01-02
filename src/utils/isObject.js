export default (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
