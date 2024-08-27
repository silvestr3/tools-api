import { FakeToolsRepository } from 'src/database/repositories/fake/fake-tools-repository';
import { FilterToolByTagService } from './filter-tool-by-tag.service';

describe('Filter tools by tag tests', () => {
  let toolsRepository: FakeToolsRepository;
  let sut: FilterToolByTagService;

  beforeEach(() => {
    toolsRepository = new FakeToolsRepository();
    sut = new FilterToolByTagService(toolsRepository);
  });

  it('Should be able to filter existing tools by tag', async () => {
    for (let i = 0; i < 20; i++) {
      toolsRepository.tools.push({
        id: `tool-${i}`,
        description: 'tool',
        link: 'link',
        title: 'random',
        tags: i > 15 ? [] : ['test'],
      });
    }

    const { tools } = await sut.execute({
      tag: 'test',
    });

    expect(tools).toHaveLength(16);
  });
});
