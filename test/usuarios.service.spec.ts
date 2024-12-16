import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './../src/modules/usuarios/usuarios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './../src/modules/usuarios/usuarios.entity';
import { Repository } from 'typeorm';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: jest.Mocked<Repository<Usuario>>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository, 
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repository = module.get<jest.Mocked<Repository<Usuario>>>(getRepositoryToken(Usuario)); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call find method from repository', async () => {
    mockRepository.find.mockResolvedValueOnce([]);  
    const users = await service.listarTodos();
    expect(mockRepository.find).toHaveBeenCalled();  
    expect(users).toEqual([]);
  });
});
