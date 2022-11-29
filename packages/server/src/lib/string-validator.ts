const validateStringInputs = (input: string | string[] | (string | null | undefined)[]): void => {
  if (Array.isArray(input)) {
    input.forEach((elem) => {
      if (!elem?.trim()) {
        throw new Error('Inputs cannot be empty strings');
      }
    });
  } else {
    if (!input.trim()) {
      throw new Error('Inputs cannot be empty strings');
    }
  }
};

export default validateStringInputs;
