class ListAllBusinessTypesService {
  public async execute(): Promise<string[] | undefined> {
    const businessTypes = [
      'Cervejaria',
      'Hamburgueria',
      'Pizzaria',
      'Gelateria',
      'Padaria',
      'Queijaria',
      'Cafeteria',
    ];

    return businessTypes;
  }
}

export default ListAllBusinessTypesService;
