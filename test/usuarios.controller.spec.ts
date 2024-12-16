import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './../src/modules/usuarios/usuarios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './../src/modules/usuarios/usuarios.entity';
import { Repository } from 'typeorm';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: Partial<Repository<Usuario>>; 

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository, 
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repository = module.get<Partial<Repository<Usuario>>>(getRepositoryToken(Usuario));  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call find method from repository', async () => {
    mockRepository.find.mockResolvedValueOnce([]);  
    const usuarios = await service.listarTodos();
    expect(mockRepository.find).toHaveBeenCalled();  
    expect(usuarios).toEqual([]);  
  });
});
