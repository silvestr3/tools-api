import { FakeToolsRepository } from 'src/database/fake/fake-tools-repository';
import { CreateToolService } from './create-tool.service';

describe('Filter tools by tag tests', () => {
  let toolsRepository: FakeToolsRepository;
  let sut: CreateToolService;

  beforeEach(() => {
    toolsRepository = new FakeToolsRepository();
    sut = new CreateToolService(toolsRepository);
  });

  it('Should be able to create a new tool', async () => {
    const tool = {
      id: 'new-tool',
      title: 'Testing',
      description: 'This is a new tool',
      link: 'test-link',
      tags: [],
    };

    await sut.execute(tool);

    expect(toolsRepository.tools).toHaveLength(1);
    expect(toolsRepository.tools[0]).toEqual(tool);
  });
});
