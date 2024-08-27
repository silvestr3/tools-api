import { FakeToolsRepository } from 'src/database/repositories/fake/fake-tools-repository';
import { ListAllToolsService } from './list-all-tools.service';

describe('List all tools test', () => {
  let toolsRepository: FakeToolsRepository;
  let sut: ListAllToolsService;

  beforeEach(() => {
    toolsRepository = new FakeToolsRepository();
    sut = new ListAllToolsService(toolsRepository);
  });

  it('Should list all tools in database', async () => {
    for (let i = 0; i < 20; i++) {
      toolsRepository.tools.push({
        id: `tool-${i}`,
        description: 'tool',
        link: 'link',
        title: 'random',
        tags: [],
      });
    }

    const { tools } = await sut.execute();

    expect(tools).toHaveLength(20);
  });
});
