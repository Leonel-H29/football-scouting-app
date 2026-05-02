describe('BcryptPasswordHasherService', () => {
  it('hashes and validates a password', async () => {
    process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/test';
    process.env.JWT_SECRET = '12345678901234567890123456789012';
    process.env.WEB_URL = 'http://localhost:5173';

    jest.resetModules();
    const { BcryptPasswordHasherService } = await import(
      '../../../src/modules/auth/application/services/bcrypt-password-hasher.service'
    );

    const service = new BcryptPasswordHasherService();
    const plainPassword = 'StrongPass1!';

    const hash = await service.hash(plainPassword);
    const isValid = await service.compare(plainPassword, hash);
    const isInvalid = await service.compare('WrongPass1!', hash);

    expect(hash).not.toBe(plainPassword);
    expect(isValid).toBe(true);
    expect(isInvalid).toBe(false);
  });
});
