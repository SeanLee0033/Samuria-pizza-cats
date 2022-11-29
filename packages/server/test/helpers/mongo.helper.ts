const mockToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ toArray: (): any => resultArray } as any);

const mockSortToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ sort: () => ({ toArray: (): any => resultArray }) } as any);

export { mockToArray, mockSortToArray };
