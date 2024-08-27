import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { RemoveToolService } from './remove-tool.service';
import { FakeToolsRepository } from 'src/database/fake/fake-tools-repository';

describe('Remove tool use case tests', () => {
  let toolsRepository: FakeToolsRepository;
  let sut: RemoveToolService;

  beforeEach(() => {
    toolsRepository = new FakeToolsRepository();
    sut = new RemoveToolService(toolsRepository);
  });

  it('Should be able to remove a tool by id', async () => {
    toolsRepository.tools.push({
      id: `tool-id`,
      description: 'tool',
      link: 'link',
      title: 'random',
      tags: [],
    });

    await sut.execute({
      id: 'tool-id',
    });

    expect(toolsRepository.tools).toHaveLength(0);
  });

  it('Should throw when attempt to remove unexisting tool', async () => {
    await expect(
      sut.execute({
        id: 'tool-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
