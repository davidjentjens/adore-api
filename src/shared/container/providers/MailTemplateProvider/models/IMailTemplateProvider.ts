import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTOs';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
