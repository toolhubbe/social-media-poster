# Website Structuur: social_media_poster

Gegenereerd op: 29-10-2025, 20:43:25
Totaal aantal bestanden: 8937

```
📁 social_media_poster/
├── 📁 social_media_poster_backend/
│   ├── 📁 alembic/
│   │   ├── 📁 versions/
│   │   │   └── 📄 004_add_app_config_table.py
│   │   ├── 📄 env.py
│   │   └── 📄 script.py.mako
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📄 auth_OLD.py
│   │   │   ├── 📄 auth.py
│   │   │   ├── 📄 customers.py
│   │   │   ├── 📄 dependencies.py
│   │   │   ├── 📄 drive.py
│   │   │   ├── 📄 events.py
│   │   │   └── 📄 photos.py
│   │   ├── 📁 core/
│   │   │   ├── 📄 config_OLD.py
│   │   │   ├── 📄 config_oldV1.py
│   │   │   ├── 📄 config.py
│   │   │   ├── 📄 database.py
│   │   │   ├── 📄 jwt_utils.py
│   │   │   ├── 📄 oauth_config_OLD.py
│   │   │   └── 📄 oauth_config.py
│   │   ├── 📁 models/
│   │   │   ├── 📄 config.py
│   │   │   ├── 📄 customer.py
│   │   │   ├── 📄 event_OLD.py
│   │   │   ├── 📄 event.py
│   │   │   ├── 📄 photo.py
│   │   │   └── 📄 user.py
│   │   ├── 📁 schemas/
│   │   │   ├── 📄 customer.py
│   │   │   ├── 📄 event.py
│   │   │   ├── 📄 photo.py
│   │   │   └── 📄 user.py
│   │   ├── 📁 services/
│   │   │   ├── 📄 drive_service.py
│   │   │   ├── 📄 google_drive_OLD.py
│   │   │   └── 📄 google_drive.py
│   │   ├── 📄 main_old.py
│   │   └── 📄 main.py
│   ├── 📁 tests/
│   ├── 📁 venv/
│   │   ├── 📁 Include/
│   │   │   └── 📁 site/
│   │   │       └── 📁 python3.13/
│   │   │           └── 📁 greenlet/
│   │   │               └── 📄 greenlet.h
│   │   ├── 📁 Lib/
│   │   │   └── 📁 site-packages/
│   │   │       ├── 📁 alembic/
│   │   │       │   ├── 📁 autogenerate/
│   │   │       │   │   ├── 📄 api.py
│   │   │       │   │   ├── 📄 compare.py
│   │   │       │   │   ├── 📄 render.py
│   │   │       │   │   └── 📄 rewriter.py
│   │   │       │   ├── 📁 ddl/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 impl.py
│   │   │       │   │   ├── 📄 mssql.py
│   │   │       │   │   ├── 📄 mysql.py
│   │   │       │   │   ├── 📄 oracle.py
│   │   │       │   │   ├── 📄 postgresql.py
│   │   │       │   │   └── 📄 sqlite.py
│   │   │       │   ├── 📁 operations/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 batch.py
│   │   │       │   │   ├── 📄 ops.py
│   │   │       │   │   ├── 📄 schemaobj.py
│   │   │       │   │   └── 📄 toimpl.py
│   │   │       │   ├── 📁 runtime/
│   │   │       │   │   ├── 📄 environment.py
│   │   │       │   │   └── 📄 migration.py
│   │   │       │   ├── 📁 script/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 revision.py
│   │   │       │   │   └── 📄 write_hooks.py
│   │   │       │   ├── 📁 templates/
│   │   │       │   │   ├── 📁 async/
│   │   │       │   │   │   ├── 📄 alembic.ini.mako
│   │   │       │   │   │   ├── 📄 env.py
│   │   │       │   │   │   ├── 📄 README
│   │   │       │   │   │   └── 📄 script.py.mako
│   │   │       │   │   ├── 📁 generic/
│   │   │       │   │   │   ├── 📄 alembic.ini.mako
│   │   │       │   │   │   ├── 📄 env.py
│   │   │       │   │   │   ├── 📄 README
│   │   │       │   │   │   └── 📄 script.py.mako
│   │   │       │   │   ├── 📁 multidb/
│   │   │       │   │   │   ├── 📄 alembic.ini.mako
│   │   │       │   │   │   ├── 📄 env.py
│   │   │       │   │   │   ├── 📄 README
│   │   │       │   │   │   └── 📄 script.py.mako
│   │   │       │   │   ├── 📁 pyproject/
│   │   │       │   │   │   ├── 📄 alembic.ini.mako
│   │   │       │   │   │   ├── 📄 env.py
│   │   │       │   │   │   ├── 📄 pyproject.toml.mako
│   │   │       │   │   │   ├── 📄 README
│   │   │       │   │   │   └── 📄 script.py.mako
│   │   │       │   │   └── 📁 pyproject_async/
│   │   │       │   │       ├── 📄 alembic.ini.mako
│   │   │       │   │       ├── 📄 env.py
│   │   │       │   │       ├── 📄 pyproject.toml.mako
│   │   │       │   │       ├── 📄 README
│   │   │       │   │       └── 📄 script.py.mako
│   │   │       │   ├── 📁 testing/
│   │   │       │   │   ├── 📁 plugin/
│   │   │       │   │   │   └── 📄 bootstrap.py
│   │   │       │   │   ├── 📁 suite/
│   │   │       │   │   │   ├── 📄 test_autogen_comments.py
│   │   │       │   │   │   ├── 📄 test_autogen_computed.py
│   │   │       │   │   │   ├── 📄 test_autogen_diffs.py
│   │   │       │   │   │   ├── 📄 test_autogen_fks.py
│   │   │       │   │   │   ├── 📄 test_autogen_identity.py
│   │   │       │   │   │   ├── 📄 test_environment.py
│   │   │       │   │   │   └── 📄 test_op.py
│   │   │       │   │   ├── 📄 assertions.py
│   │   │       │   │   ├── 📄 env.py
│   │   │       │   │   ├── 📄 fixtures.py
│   │   │       │   │   ├── 📄 requirements.py
│   │   │       │   │   ├── 📄 schemacompare.py
│   │   │       │   │   ├── 📄 util.py
│   │   │       │   │   └── 📄 warnings.py
│   │   │       │   ├── 📁 util/
│   │   │       │   │   ├── 📄 compat.py
│   │   │       │   │   ├── 📄 editor.py
│   │   │       │   │   ├── 📄 exc.py
│   │   │       │   │   ├── 📄 langhelpers.py
│   │   │       │   │   ├── 📄 messaging.py
│   │   │       │   │   ├── 📄 pyfiles.py
│   │   │       │   │   └── 📄 sqla_compat.py
│   │   │       │   ├── 📄 command.py
│   │   │       │   ├── 📄 config.py
│   │   │       │   ├── 📄 context.py
│   │   │       │   ├── 📄 context.pyi
│   │   │       │   ├── 📄 environment.py
│   │   │       │   ├── 📄 migration.py
│   │   │       │   ├── 📄 op.py
│   │   │       │   ├── 📄 op.pyi
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 alembic-1.17.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 annotated_doc/
│   │   │       │   ├── 📄 main.py
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 annotated_doc-0.0.3.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 annotated_types/
│   │   │       │   ├── 📄 py.typed
│   │   │       │   └── 📄 test_cases.py
│   │   │       ├── 📁 annotated_types-0.7.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 anyio/
│   │   │       │   ├── 📁 abc/
│   │   │       │   ├── 📁 streams/
│   │   │       │   │   ├── 📄 buffered.py
│   │   │       │   │   ├── 📄 file.py
│   │   │       │   │   ├── 📄 memory.py
│   │   │       │   │   ├── 📄 stapled.py
│   │   │       │   │   ├── 📄 text.py
│   │   │       │   │   └── 📄 tls.py
│   │   │       │   ├── 📄 from_thread.py
│   │   │       │   ├── 📄 lowlevel.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 pytest_plugin.py
│   │   │       │   ├── 📄 to_interpreter.py
│   │   │       │   ├── 📄 to_process.py
│   │   │       │   └── 📄 to_thread.py
│   │   │       ├── 📁 anyio-4.11.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 apiclient/
│   │   │       ├── 📁 cachetools/
│   │   │       │   ├── 📄 func.py
│   │   │       │   └── 📄 keys.py
│   │   │       ├── 📁 cachetools-6.2.1.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 certifi/
│   │   │       │   ├── 📄 cacert.pem
│   │   │       │   ├── 📄 core.py
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 certifi-2025.10.5.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 cffi/
│   │   │       │   ├── 📄 api.py
│   │   │       │   ├── 📄 backend_ctypes.py
│   │   │       │   ├── 📄 cffi_opcode.py
│   │   │       │   ├── 📄 commontypes.py
│   │   │       │   ├── 📄 cparser.py
│   │   │       │   ├── 📄 error.py
│   │   │       │   ├── 📄 ffiplatform.py
│   │   │       │   ├── 📄 lock.py
│   │   │       │   ├── 📄 model.py
│   │   │       │   ├── 📄 parse_c_type.h
│   │   │       │   ├── 📄 pkgconfig.py
│   │   │       │   ├── 📄 recompiler.py
│   │   │       │   ├── 📄 setuptools_ext.py
│   │   │       │   ├── 📄 vengine_cpy.py
│   │   │       │   ├── 📄 vengine_gen.py
│   │   │       │   └── 📄 verifier.py
│   │   │       ├── 📁 cffi-2.0.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   ├── 📄 AUTHORS
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 charset_normalizer/
│   │   │       │   ├── 📁 cli/
│   │   │       │   ├── 📄 api.py
│   │   │       │   ├── 📄 cd.py
│   │   │       │   ├── 📄 constant.py
│   │   │       │   ├── 📄 legacy.py
│   │   │       │   ├── 📄 md__mypyc.cp313-win_amd64.pyd
│   │   │       │   ├── 📄 md.cp313-win_amd64.pyd
│   │   │       │   ├── 📄 md.py
│   │   │       │   ├── 📄 models.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 utils.py
│   │   │       │   └── 📄 version.py
│   │   │       ├── 📁 charset_normalizer-3.4.4.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 click/
│   │   │       │   ├── 📄 core.py
│   │   │       │   ├── 📄 decorators.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 formatting.py
│   │   │       │   ├── 📄 globals.py
│   │   │       │   ├── 📄 parser.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 shell_completion.py
│   │   │       │   ├── 📄 termui.py
│   │   │       │   ├── 📄 testing.py
│   │   │       │   ├── 📄 types.py
│   │   │       │   └── 📄 utils.py
│   │   │       ├── 📁 click-8.3.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 colorama/
│   │   │       │   ├── 📁 tests/
│   │   │       │   │   ├── 📄 ansi_test.py
│   │   │       │   │   ├── 📄 ansitowin32_test.py
│   │   │       │   │   ├── 📄 initialise_test.py
│   │   │       │   │   ├── 📄 isatty_test.py
│   │   │       │   │   ├── 📄 utils.py
│   │   │       │   │   └── 📄 winterm_test.py
│   │   │       │   ├── 📄 ansi.py
│   │   │       │   ├── 📄 ansitowin32.py
│   │   │       │   ├── 📄 initialise.py
│   │   │       │   ├── 📄 win32.py
│   │   │       │   └── 📄 winterm.py
│   │   │       ├── 📁 colorama-0.4.6.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 cryptography/
│   │   │       │   ├── 📁 hazmat/
│   │   │       │   │   ├── 📁 asn1/
│   │   │       │   │   │   └── 📄 asn1.py
│   │   │       │   │   ├── 📁 backends/
│   │   │       │   │   │   ├── 📁 openssl/
│   │   │       │   │   │   │   └── 📄 backend.py
│   │   │       │   │   ├── 📁 bindings/
│   │   │       │   │   │   ├── 📁 openssl/
│   │   │       │   │   │   │   └── 📄 binding.py
│   │   │       │   │   ├── 📁 decrepit/
│   │   │       │   │   │   ├── 📁 ciphers/
│   │   │       │   │   │   │   └── 📄 algorithms.py
│   │   │       │   │   ├── 📁 primitives/
│   │   │       │   │   │   ├── 📁 asymmetric/
│   │   │       │   │   │   │   ├── 📄 dh.py
│   │   │       │   │   │   │   ├── 📄 dsa.py
│   │   │       │   │   │   │   ├── 📄 ec.py
│   │   │       │   │   │   │   ├── 📄 ed448.py
│   │   │       │   │   │   │   ├── 📄 ed25519.py
│   │   │       │   │   │   │   ├── 📄 padding.py
│   │   │       │   │   │   │   ├── 📄 rsa.py
│   │   │       │   │   │   │   ├── 📄 types.py
│   │   │       │   │   │   │   ├── 📄 utils.py
│   │   │       │   │   │   │   ├── 📄 x448.py
│   │   │       │   │   │   │   └── 📄 x25519.py
│   │   │       │   │   │   ├── 📁 ciphers/
│   │   │       │   │   │   │   ├── 📄 aead.py
│   │   │       │   │   │   │   ├── 📄 algorithms.py
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   └── 📄 modes.py
│   │   │       │   │   │   ├── 📁 kdf/
│   │   │       │   │   │   │   ├── 📄 argon2.py
│   │   │       │   │   │   │   ├── 📄 concatkdf.py
│   │   │       │   │   │   │   ├── 📄 hkdf.py
│   │   │       │   │   │   │   ├── 📄 kbkdf.py
│   │   │       │   │   │   │   ├── 📄 pbkdf2.py
│   │   │       │   │   │   │   ├── 📄 scrypt.py
│   │   │       │   │   │   │   └── 📄 x963kdf.py
│   │   │       │   │   │   ├── 📁 serialization/
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   ├── 📄 pkcs7.py
│   │   │       │   │   │   │   ├── 📄 pkcs12.py
│   │   │       │   │   │   │   └── 📄 ssh.py
│   │   │       │   │   │   ├── 📁 twofactor/
│   │   │       │   │   │   │   ├── 📄 hotp.py
│   │   │       │   │   │   │   └── 📄 totp.py
│   │   │       │   │   │   ├── 📄 cmac.py
│   │   │       │   │   │   ├── 📄 constant_time.py
│   │   │       │   │   │   ├── 📄 hashes.py
│   │   │       │   │   │   ├── 📄 hmac.py
│   │   │       │   │   │   ├── 📄 keywrap.py
│   │   │       │   │   │   ├── 📄 padding.py
│   │   │       │   │   │   └── 📄 poly1305.py
│   │   │       │   ├── 📁 x509/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 certificate_transparency.py
│   │   │       │   │   ├── 📄 extensions.py
│   │   │       │   │   ├── 📄 general_name.py
│   │   │       │   │   ├── 📄 name.py
│   │   │       │   │   ├── 📄 ocsp.py
│   │   │       │   │   ├── 📄 oid.py
│   │   │       │   │   └── 📄 verification.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 fernet.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   └── 📄 utils.py
│   │   │       ├── 📁 cryptography-46.0.3.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   ├── 📄 LICENSE
│   │   │       │   │   ├── 📄 LICENSE.APACHE
│   │   │       │   │   └── 📄 LICENSE.BSD
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 dns/
│   │   │       │   ├── 📁 dnssecalgs/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 cryptography.py
│   │   │       │   │   ├── 📄 dsa.py
│   │   │       │   │   ├── 📄 ecdsa.py
│   │   │       │   │   ├── 📄 eddsa.py
│   │   │       │   │   └── 📄 rsa.py
│   │   │       │   ├── 📁 quic/
│   │   │       │   ├── 📁 rdtypes/
│   │   │       │   │   ├── 📁 ANY/
│   │   │       │   │   │   ├── 📄 AFSDB.py
│   │   │       │   │   │   ├── 📄 AMTRELAY.py
│   │   │       │   │   │   ├── 📄 AVC.py
│   │   │       │   │   │   ├── 📄 CAA.py
│   │   │       │   │   │   ├── 📄 CDNSKEY.py
│   │   │       │   │   │   ├── 📄 CDS.py
│   │   │       │   │   │   ├── 📄 CERT.py
│   │   │       │   │   │   ├── 📄 CNAME.py
│   │   │       │   │   │   ├── 📄 CSYNC.py
│   │   │       │   │   │   ├── 📄 DLV.py
│   │   │       │   │   │   ├── 📄 DNAME.py
│   │   │       │   │   │   ├── 📄 DNSKEY.py
│   │   │       │   │   │   ├── 📄 DS.py
│   │   │       │   │   │   ├── 📄 DSYNC.py
│   │   │       │   │   │   ├── 📄 EUI48.py
│   │   │       │   │   │   ├── 📄 EUI64.py
│   │   │       │   │   │   ├── 📄 GPOS.py
│   │   │       │   │   │   ├── 📄 HINFO.py
│   │   │       │   │   │   ├── 📄 HIP.py
│   │   │       │   │   │   ├── 📄 ISDN.py
│   │   │       │   │   │   ├── 📄 L32.py
│   │   │       │   │   │   ├── 📄 L64.py
│   │   │       │   │   │   ├── 📄 LOC.py
│   │   │       │   │   │   ├── 📄 LP.py
│   │   │       │   │   │   ├── 📄 MX.py
│   │   │       │   │   │   ├── 📄 NID.py
│   │   │       │   │   │   ├── 📄 NINFO.py
│   │   │       │   │   │   ├── 📄 NS.py
│   │   │       │   │   │   ├── 📄 NSEC.py
│   │   │       │   │   │   ├── 📄 NSEC3.py
│   │   │       │   │   │   ├── 📄 NSEC3PARAM.py
│   │   │       │   │   │   ├── 📄 OPENPGPKEY.py
│   │   │       │   │   │   ├── 📄 OPT.py
│   │   │       │   │   │   ├── 📄 PTR.py
│   │   │       │   │   │   ├── 📄 RESINFO.py
│   │   │       │   │   │   ├── 📄 RP.py
│   │   │       │   │   │   ├── 📄 RRSIG.py
│   │   │       │   │   │   ├── 📄 RT.py
│   │   │       │   │   │   ├── 📄 SMIMEA.py
│   │   │       │   │   │   ├── 📄 SOA.py
│   │   │       │   │   │   ├── 📄 SPF.py
│   │   │       │   │   │   ├── 📄 SSHFP.py
│   │   │       │   │   │   ├── 📄 TKEY.py
│   │   │       │   │   │   ├── 📄 TLSA.py
│   │   │       │   │   │   ├── 📄 TSIG.py
│   │   │       │   │   │   ├── 📄 TXT.py
│   │   │       │   │   │   ├── 📄 URI.py
│   │   │       │   │   │   ├── 📄 WALLET.py
│   │   │       │   │   │   ├── 📄 X25.py
│   │   │       │   │   │   └── 📄 ZONEMD.py
│   │   │       │   │   ├── 📁 CH/
│   │   │       │   │   │   └── 📄 A.py
│   │   │       │   │   ├── 📁 IN/
│   │   │       │   │   │   ├── 📄 A.py
│   │   │       │   │   │   ├── 📄 AAAA.py
│   │   │       │   │   │   ├── 📄 APL.py
│   │   │       │   │   │   ├── 📄 DHCID.py
│   │   │       │   │   │   ├── 📄 HTTPS.py
│   │   │       │   │   │   ├── 📄 IPSECKEY.py
│   │   │       │   │   │   ├── 📄 KX.py
│   │   │       │   │   │   ├── 📄 NAPTR.py
│   │   │       │   │   │   ├── 📄 NSAP_PTR.py
│   │   │       │   │   │   ├── 📄 NSAP.py
│   │   │       │   │   │   ├── 📄 PX.py
│   │   │       │   │   │   ├── 📄 SRV.py
│   │   │       │   │   │   ├── 📄 SVCB.py
│   │   │       │   │   │   └── 📄 WKS.py
│   │   │       │   │   ├── 📄 dnskeybase.py
│   │   │       │   │   ├── 📄 dsbase.py
│   │   │       │   │   ├── 📄 euibase.py
│   │   │       │   │   ├── 📄 mxbase.py
│   │   │       │   │   ├── 📄 nsbase.py
│   │   │       │   │   ├── 📄 svcbbase.py
│   │   │       │   │   ├── 📄 tlsabase.py
│   │   │       │   │   ├── 📄 txtbase.py
│   │   │       │   │   └── 📄 util.py
│   │   │       │   ├── 📄 asyncbackend.py
│   │   │       │   ├── 📄 asyncquery.py
│   │   │       │   ├── 📄 asyncresolver.py
│   │   │       │   ├── 📄 btree.py
│   │   │       │   ├── 📄 btreezone.py
│   │   │       │   ├── 📄 dnssec.py
│   │   │       │   ├── 📄 dnssectypes.py
│   │   │       │   ├── 📄 e164.py
│   │   │       │   ├── 📄 edns.py
│   │   │       │   ├── 📄 entropy.py
│   │   │       │   ├── 📄 enum.py
│   │   │       │   ├── 📄 exception.py
│   │   │       │   ├── 📄 flags.py
│   │   │       │   ├── 📄 grange.py
│   │   │       │   ├── 📄 immutable.py
│   │   │       │   ├── 📄 inet.py
│   │   │       │   ├── 📄 ipv4.py
│   │   │       │   ├── 📄 ipv6.py
│   │   │       │   ├── 📄 message.py
│   │   │       │   ├── 📄 name.py
│   │   │       │   ├── 📄 namedict.py
│   │   │       │   ├── 📄 nameserver.py
│   │   │       │   ├── 📄 node.py
│   │   │       │   ├── 📄 opcode.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 query.py
│   │   │       │   ├── 📄 rcode.py
│   │   │       │   ├── 📄 rdata.py
│   │   │       │   ├── 📄 rdataclass.py
│   │   │       │   ├── 📄 rdataset.py
│   │   │       │   ├── 📄 rdatatype.py
│   │   │       │   ├── 📄 renderer.py
│   │   │       │   ├── 📄 resolver.py
│   │   │       │   ├── 📄 reversename.py
│   │   │       │   ├── 📄 rrset.py
│   │   │       │   ├── 📄 serial.py
│   │   │       │   ├── 📄 set.py
│   │   │       │   ├── 📄 tokenizer.py
│   │   │       │   ├── 📄 transaction.py
│   │   │       │   ├── 📄 tsig.py
│   │   │       │   ├── 📄 tsigkeyring.py
│   │   │       │   ├── 📄 ttl.py
│   │   │       │   ├── 📄 update.py
│   │   │       │   ├── 📄 version.py
│   │   │       │   ├── 📄 versioned.py
│   │   │       │   ├── 📄 win32util.py
│   │   │       │   ├── 📄 wire.py
│   │   │       │   ├── 📄 xfr.py
│   │   │       │   ├── 📄 zone.py
│   │   │       │   ├── 📄 zonefile.py
│   │   │       │   └── 📄 zonetypes.py
│   │   │       ├── 📁 dnspython-2.8.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 dotenv/
│   │   │       │   ├── 📄 cli.py
│   │   │       │   ├── 📄 ipython.py
│   │   │       │   ├── 📄 main.py
│   │   │       │   ├── 📄 parser.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 variables.py
│   │   │       │   └── 📄 version.py
│   │   │       ├── 📁 ecdsa/
│   │   │       │   ├── 📄 curves.py
│   │   │       │   ├── 📄 der.py
│   │   │       │   ├── 📄 ecdh.py
│   │   │       │   ├── 📄 ecdsa.py
│   │   │       │   ├── 📄 eddsa.py
│   │   │       │   ├── 📄 ellipticcurve.py
│   │   │       │   ├── 📄 errors.py
│   │   │       │   ├── 📄 keys.py
│   │   │       │   ├── 📄 numbertheory.py
│   │   │       │   ├── 📄 rfc6979.py
│   │   │       │   ├── 📄 ssh.py
│   │   │       │   ├── 📄 test_curves.py
│   │   │       │   ├── 📄 test_der.py
│   │   │       │   ├── 📄 test_ecdh.py
│   │   │       │   ├── 📄 test_ecdsa.py
│   │   │       │   ├── 📄 test_eddsa.py
│   │   │       │   ├── 📄 test_ellipticcurve.py
│   │   │       │   ├── 📄 test_jacobi.py
│   │   │       │   ├── 📄 test_keys.py
│   │   │       │   ├── 📄 test_malformed_sigs.py
│   │   │       │   ├── 📄 test_numbertheory.py
│   │   │       │   ├── 📄 test_pyecdsa.py
│   │   │       │   ├── 📄 test_rw_lock.py
│   │   │       │   ├── 📄 test_sha3.py
│   │   │       │   └── 📄 util.py
│   │   │       ├── 📁 ecdsa-0.19.1.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 email_validator/
│   │   │       │   ├── 📄 deliverability.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 rfc_constants.py
│   │   │       │   ├── 📄 syntax.py
│   │   │       │   ├── 📄 types.py
│   │   │       │   ├── 📄 validate_email.py
│   │   │       │   └── 📄 version.py
│   │   │       ├── 📁 email_validator-2.3.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 fastapi/
│   │   │       │   ├── 📁 dependencies/
│   │   │       │   │   ├── 📄 models.py
│   │   │       │   │   └── 📄 utils.py
│   │   │       │   ├── 📁 middleware/
│   │   │       │   │   ├── 📄 asyncexitstack.py
│   │   │       │   │   ├── 📄 cors.py
│   │   │       │   │   ├── 📄 gzip.py
│   │   │       │   │   ├── 📄 httpsredirect.py
│   │   │       │   │   ├── 📄 trustedhost.py
│   │   │       │   │   └── 📄 wsgi.py
│   │   │       │   ├── 📁 openapi/
│   │   │       │   │   ├── 📄 constants.py
│   │   │       │   │   ├── 📄 docs.py
│   │   │       │   │   ├── 📄 models.py
│   │   │       │   │   └── 📄 utils.py
│   │   │       │   ├── 📁 security/
│   │   │       │   │   ├── 📄 api_key.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 http.py
│   │   │       │   │   ├── 📄 oauth2.py
│   │   │       │   │   ├── 📄 open_id_connect_url.py
│   │   │       │   │   └── 📄 utils.py
│   │   │       │   ├── 📄 applications.py
│   │   │       │   ├── 📄 background.py
│   │   │       │   ├── 📄 cli.py
│   │   │       │   ├── 📄 concurrency.py
│   │   │       │   ├── 📄 datastructures.py
│   │   │       │   ├── 📄 encoders.py
│   │   │       │   ├── 📄 exception_handlers.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 logger.py
│   │   │       │   ├── 📄 param_functions.py
│   │   │       │   ├── 📄 params.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 requests.py
│   │   │       │   ├── 📄 responses.py
│   │   │       │   ├── 📄 routing.py
│   │   │       │   ├── 📄 staticfiles.py
│   │   │       │   ├── 📄 temp_pydantic_v1_params.py
│   │   │       │   ├── 📄 templating.py
│   │   │       │   ├── 📄 testclient.py
│   │   │       │   ├── 📄 types.py
│   │   │       │   ├── 📄 utils.py
│   │   │       │   └── 📄 websockets.py
│   │   │       ├── 📁 fastapi-0.120.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 google/
│   │   │       │   ├── 📁 api/
│   │   │       │   │   ├── 📄 annotations_pb2.py
│   │   │       │   │   ├── 📄 annotations_pb2.pyi
│   │   │       │   │   ├── 📄 annotations.proto
│   │   │       │   │   ├── 📄 auth_pb2.py
│   │   │       │   │   ├── 📄 auth_pb2.pyi
│   │   │       │   │   ├── 📄 auth.proto
│   │   │       │   │   ├── 📄 backend_pb2.py
│   │   │       │   │   ├── 📄 backend_pb2.pyi
│   │   │       │   │   ├── 📄 backend.proto
│   │   │       │   │   ├── 📄 billing_pb2.py
│   │   │       │   │   ├── 📄 billing_pb2.pyi
│   │   │       │   │   ├── 📄 billing.proto
│   │   │       │   │   ├── 📄 client_pb2.py
│   │   │       │   │   ├── 📄 client_pb2.pyi
│   │   │       │   │   ├── 📄 client.proto
│   │   │       │   │   ├── 📄 config_change_pb2.py
│   │   │       │   │   ├── 📄 config_change_pb2.pyi
│   │   │       │   │   ├── 📄 config_change.proto
│   │   │       │   │   ├── 📄 consumer_pb2.py
│   │   │       │   │   ├── 📄 consumer_pb2.pyi
│   │   │       │   │   ├── 📄 consumer.proto
│   │   │       │   │   ├── 📄 context_pb2.py
│   │   │       │   │   ├── 📄 context_pb2.pyi
│   │   │       │   │   ├── 📄 context.proto
│   │   │       │   │   ├── 📄 control_pb2.py
│   │   │       │   │   ├── 📄 control_pb2.pyi
│   │   │       │   │   ├── 📄 control.proto
│   │   │       │   │   ├── 📄 distribution_pb2.py
│   │   │       │   │   ├── 📄 distribution_pb2.pyi
│   │   │       │   │   ├── 📄 distribution.proto
│   │   │       │   │   ├── 📄 documentation_pb2.py
│   │   │       │   │   ├── 📄 documentation_pb2.pyi
│   │   │       │   │   ├── 📄 documentation.proto
│   │   │       │   │   ├── 📄 endpoint_pb2.py
│   │   │       │   │   ├── 📄 endpoint_pb2.pyi
│   │   │       │   │   ├── 📄 endpoint.proto
│   │   │       │   │   ├── 📄 error_reason_pb2.py
│   │   │       │   │   ├── 📄 error_reason_pb2.pyi
│   │   │       │   │   ├── 📄 error_reason.proto
│   │   │       │   │   ├── 📄 field_behavior_pb2.py
│   │   │       │   │   ├── 📄 field_behavior_pb2.pyi
│   │   │       │   │   ├── 📄 field_behavior.proto
│   │   │       │   │   ├── 📄 field_info_pb2.py
│   │   │       │   │   ├── 📄 field_info_pb2.pyi
│   │   │       │   │   ├── 📄 field_info.proto
│   │   │       │   │   ├── 📄 http_pb2.py
│   │   │       │   │   ├── 📄 http_pb2.pyi
│   │   │       │   │   ├── 📄 http.proto
│   │   │       │   │   ├── 📄 httpbody_pb2.py
│   │   │       │   │   ├── 📄 httpbody_pb2.pyi
│   │   │       │   │   ├── 📄 httpbody.proto
│   │   │       │   │   ├── 📄 label_pb2.py
│   │   │       │   │   ├── 📄 label_pb2.pyi
│   │   │       │   │   ├── 📄 label.proto
│   │   │       │   │   ├── 📄 launch_stage_pb2.py
│   │   │       │   │   ├── 📄 launch_stage_pb2.pyi
│   │   │       │   │   ├── 📄 launch_stage.proto
│   │   │       │   │   ├── 📄 log_pb2.py
│   │   │       │   │   ├── 📄 log_pb2.pyi
│   │   │       │   │   ├── 📄 log.proto
│   │   │       │   │   ├── 📄 logging_pb2.py
│   │   │       │   │   ├── 📄 logging_pb2.pyi
│   │   │       │   │   ├── 📄 logging.proto
│   │   │       │   │   ├── 📄 metric_pb2.py
│   │   │       │   │   ├── 📄 metric_pb2.pyi
│   │   │       │   │   ├── 📄 metric.proto
│   │   │       │   │   ├── 📄 monitored_resource_pb2.py
│   │   │       │   │   ├── 📄 monitored_resource_pb2.pyi
│   │   │       │   │   ├── 📄 monitored_resource.proto
│   │   │       │   │   ├── 📄 monitoring_pb2.py
│   │   │       │   │   ├── 📄 monitoring_pb2.pyi
│   │   │       │   │   ├── 📄 monitoring.proto
│   │   │       │   │   ├── 📄 policy_pb2.py
│   │   │       │   │   ├── 📄 policy_pb2.pyi
│   │   │       │   │   ├── 📄 policy.proto
│   │   │       │   │   ├── 📄 quota_pb2.py
│   │   │       │   │   ├── 📄 quota_pb2.pyi
│   │   │       │   │   ├── 📄 quota.proto
│   │   │       │   │   ├── 📄 resource_pb2.py
│   │   │       │   │   ├── 📄 resource_pb2.pyi
│   │   │       │   │   ├── 📄 resource.proto
│   │   │       │   │   ├── 📄 routing_pb2.py
│   │   │       │   │   ├── 📄 routing_pb2.pyi
│   │   │       │   │   ├── 📄 routing.proto
│   │   │       │   │   ├── 📄 service_pb2.py
│   │   │       │   │   ├── 📄 service_pb2.pyi
│   │   │       │   │   ├── 📄 service.proto
│   │   │       │   │   ├── 📄 source_info_pb2.py
│   │   │       │   │   ├── 📄 source_info_pb2.pyi
│   │   │       │   │   ├── 📄 source_info.proto
│   │   │       │   │   ├── 📄 system_parameter_pb2.py
│   │   │       │   │   ├── 📄 system_parameter_pb2.pyi
│   │   │       │   │   ├── 📄 system_parameter.proto
│   │   │       │   │   ├── 📄 usage_pb2.py
│   │   │       │   │   ├── 📄 usage_pb2.pyi
│   │   │       │   │   ├── 📄 usage.proto
│   │   │       │   │   ├── 📄 visibility_pb2.py
│   │   │       │   │   ├── 📄 visibility_pb2.pyi
│   │   │       │   │   └── 📄 visibility.proto
│   │   │       │   ├── 📁 api_core/
│   │   │       │   │   ├── 📁 future/
│   │   │       │   │   │   ├── 📄 async_future.py
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   └── 📄 polling.py
│   │   │       │   │   ├── 📁 gapic_v1/
│   │   │       │   │   │   ├── 📄 client_info.py
│   │   │       │   │   │   ├── 📄 config_async.py
│   │   │       │   │   │   ├── 📄 config.py
│   │   │       │   │   │   ├── 📄 method_async.py
│   │   │       │   │   │   ├── 📄 method.py
│   │   │       │   │   │   └── 📄 routing_header.py
│   │   │       │   │   ├── 📁 operations_v1/
│   │   │       │   │   │   ├── 📁 transports/
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   ├── 📄 rest_asyncio.py
│   │   │       │   │   │   │   └── 📄 rest.py
│   │   │       │   │   │   ├── 📄 abstract_operations_base_client.py
│   │   │       │   │   │   ├── 📄 abstract_operations_client.py
│   │   │       │   │   │   ├── 📄 operations_async_client.py
│   │   │       │   │   │   ├── 📄 operations_client_config.py
│   │   │       │   │   │   ├── 📄 operations_client.py
│   │   │       │   │   │   ├── 📄 operations_rest_client_async.py
│   │   │       │   │   │   ├── 📄 pagers_async.py
│   │   │       │   │   │   ├── 📄 pagers_base.py
│   │   │       │   │   │   └── 📄 pagers.py
│   │   │       │   │   ├── 📁 retry/
│   │   │       │   │   │   ├── 📄 retry_base.py
│   │   │       │   │   │   ├── 📄 retry_streaming_async.py
│   │   │       │   │   │   ├── 📄 retry_streaming.py
│   │   │       │   │   │   ├── 📄 retry_unary_async.py
│   │   │       │   │   │   └── 📄 retry_unary.py
│   │   │       │   │   ├── 📄 bidi_async.py
│   │   │       │   │   ├── 📄 bidi_base.py
│   │   │       │   │   ├── 📄 bidi.py
│   │   │       │   │   ├── 📄 client_info.py
│   │   │       │   │   ├── 📄 client_logging.py
│   │   │       │   │   ├── 📄 client_options.py
│   │   │       │   │   ├── 📄 datetime_helpers.py
│   │   │       │   │   ├── 📄 exceptions.py
│   │   │       │   │   ├── 📄 extended_operation.py
│   │   │       │   │   ├── 📄 general_helpers.py
│   │   │       │   │   ├── 📄 grpc_helpers_async.py
│   │   │       │   │   ├── 📄 grpc_helpers.py
│   │   │       │   │   ├── 📄 iam.py
│   │   │       │   │   ├── 📄 operation_async.py
│   │   │       │   │   ├── 📄 operation.py
│   │   │       │   │   ├── 📄 page_iterator_async.py
│   │   │       │   │   ├── 📄 page_iterator.py
│   │   │       │   │   ├── 📄 path_template.py
│   │   │       │   │   ├── 📄 protobuf_helpers.py
│   │   │       │   │   ├── 📄 py.typed
│   │   │       │   │   ├── 📄 rest_helpers.py
│   │   │       │   │   ├── 📄 rest_streaming_async.py
│   │   │       │   │   ├── 📄 rest_streaming.py
│   │   │       │   │   ├── 📄 retry_async.py
│   │   │       │   │   ├── 📄 timeout.py
│   │   │       │   │   ├── 📄 universe.py
│   │   │       │   │   ├── 📄 version_header.py
│   │   │       │   │   └── 📄 version.py
│   │   │       │   ├── 📁 auth/
│   │   │       │   │   ├── 📁 aio/
│   │   │       │   │   │   ├── 📁 transport/
│   │   │       │   │   │   │   ├── 📄 aiohttp.py
│   │   │       │   │   │   │   └── 📄 sessions.py
│   │   │       │   │   │   └── 📄 credentials.py
│   │   │       │   │   ├── 📁 compute_engine/
│   │   │       │   │   │   └── 📄 credentials.py
│   │   │       │   │   ├── 📁 crypt/
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 es256.py
│   │   │       │   │   │   └── 📄 rsa.py
│   │   │       │   │   ├── 📁 transport/
│   │   │       │   │   │   ├── 📄 grpc.py
│   │   │       │   │   │   ├── 📄 mtls.py
│   │   │       │   │   │   ├── 📄 requests.py
│   │   │       │   │   │   └── 📄 urllib3.py
│   │   │       │   │   ├── 📄 api_key.py
│   │   │       │   │   ├── 📄 app_engine.py
│   │   │       │   │   ├── 📄 aws.py
│   │   │       │   │   ├── 📄 credentials.py
│   │   │       │   │   ├── 📄 downscoped.py
│   │   │       │   │   ├── 📄 environment_vars.py
│   │   │       │   │   ├── 📄 exceptions.py
│   │   │       │   │   ├── 📄 external_account_authorized_user.py
│   │   │       │   │   ├── 📄 external_account.py
│   │   │       │   │   ├── 📄 iam.py
│   │   │       │   │   ├── 📄 identity_pool.py
│   │   │       │   │   ├── 📄 impersonated_credentials.py
│   │   │       │   │   ├── 📄 jwt.py
│   │   │       │   │   ├── 📄 metrics.py
│   │   │       │   │   ├── 📄 pluggable.py
│   │   │       │   │   ├── 📄 py.typed
│   │   │       │   │   └── 📄 version.py
│   │   │       │   ├── 📁 cloud/
│   │   │       │   │   ├── 📁 location/
│   │   │       │   │   │   ├── 📄 locations_pb2.py
│   │   │       │   │   │   ├── 📄 locations_pb2.pyi
│   │   │       │   │   │   └── 📄 locations.proto
│   │   │       │   │   ├── 📄 extended_operations_pb2.py
│   │   │       │   │   ├── 📄 extended_operations_pb2.pyi
│   │   │       │   │   └── 📄 extended_operations.proto
│   │   │       │   ├── 📁 gapic/
│   │   │       │   │   └── 📁 metadata/
│   │   │       │   │       ├── 📄 gapic_metadata_pb2.py
│   │   │       │   │       ├── 📄 gapic_metadata_pb2.pyi
│   │   │       │   │       └── 📄 gapic_metadata.proto
│   │   │       │   ├── 📁 logging/
│   │   │       │   │   └── 📁 type/
│   │   │       │   │       ├── 📄 http_request_pb2.py
│   │   │       │   │       ├── 📄 http_request_pb2.pyi
│   │   │       │   │       ├── 📄 http_request.proto
│   │   │       │   │       ├── 📄 log_severity_pb2.py
│   │   │       │   │       ├── 📄 log_severity_pb2.pyi
│   │   │       │   │       └── 📄 log_severity.proto
│   │   │       │   ├── 📁 longrunning/
│   │   │       │   │   ├── 📄 operations_grpc_pb2.py
│   │   │       │   │   ├── 📄 operations_grpc.py
│   │   │       │   │   ├── 📄 operations_pb2_grpc.py
│   │   │       │   │   ├── 📄 operations_pb2.py
│   │   │       │   │   ├── 📄 operations_proto_pb2.py
│   │   │       │   │   ├── 📄 operations_proto_pb2.pyi
│   │   │       │   │   ├── 📄 operations_proto.proto
│   │   │       │   │   └── 📄 operations_proto.py
│   │   │       │   ├── 📁 oauth2/
│   │   │       │   │   ├── 📄 challenges.py
│   │   │       │   │   ├── 📄 credentials.py
│   │   │       │   │   ├── 📄 gdch_credentials.py
│   │   │       │   │   ├── 📄 id_token.py
│   │   │       │   │   ├── 📄 py.typed
│   │   │       │   │   ├── 📄 reauth.py
│   │   │       │   │   ├── 📄 service_account.py
│   │   │       │   │   ├── 📄 sts.py
│   │   │       │   │   ├── 📄 utils.py
│   │   │       │   │   ├── 📄 webauthn_handler_factory.py
│   │   │       │   │   ├── 📄 webauthn_handler.py
│   │   │       │   │   └── 📄 webauthn_types.py
│   │   │       │   ├── 📁 protobuf/
│   │   │       │   │   ├── 📁 compiler/
│   │   │       │   │   │   └── 📄 plugin_pb2.py
│   │   │       │   │   ├── 📁 internal/
│   │   │       │   │   │   ├── 📄 api_implementation.py
│   │   │       │   │   │   ├── 📄 builder.py
│   │   │       │   │   │   ├── 📄 containers.py
│   │   │       │   │   │   ├── 📄 decoder.py
│   │   │       │   │   │   ├── 📄 encoder.py
│   │   │       │   │   │   ├── 📄 enum_type_wrapper.py
│   │   │       │   │   │   ├── 📄 extension_dict.py
│   │   │       │   │   │   ├── 📄 field_mask.py
│   │   │       │   │   │   ├── 📄 message_listener.py
│   │   │       │   │   │   ├── 📄 python_edition_defaults.py
│   │   │       │   │   │   ├── 📄 python_message.py
│   │   │       │   │   │   ├── 📄 testing_refleaks.py
│   │   │       │   │   │   ├── 📄 type_checkers.py
│   │   │       │   │   │   ├── 📄 well_known_types.py
│   │   │       │   │   │   └── 📄 wire_format.py
│   │   │       │   │   ├── 📁 pyext/
│   │   │       │   │   │   └── 📄 cpp_message.py
│   │   │       │   │   ├── 📁 testdata/
│   │   │       │   │   ├── 📁 util/
│   │   │       │   │   ├── 📄 any_pb2.py
│   │   │       │   │   ├── 📄 any.py
│   │   │       │   │   ├── 📄 api_pb2.py
│   │   │       │   │   ├── 📄 descriptor_database.py
│   │   │       │   │   ├── 📄 descriptor_pb2.py
│   │   │       │   │   ├── 📄 descriptor_pool.py
│   │   │       │   │   ├── 📄 descriptor.py
│   │   │       │   │   ├── 📄 duration_pb2.py
│   │   │       │   │   ├── 📄 duration.py
│   │   │       │   │   ├── 📄 empty_pb2.py
│   │   │       │   │   ├── 📄 field_mask_pb2.py
│   │   │       │   │   ├── 📄 json_format.py
│   │   │       │   │   ├── 📄 message_factory.py
│   │   │       │   │   ├── 📄 message.py
│   │   │       │   │   ├── 📄 proto_builder.py
│   │   │       │   │   ├── 📄 proto_json.py
│   │   │       │   │   ├── 📄 proto_text.py
│   │   │       │   │   ├── 📄 proto.py
│   │   │       │   │   ├── 📄 reflection.py
│   │   │       │   │   ├── 📄 runtime_version.py
│   │   │       │   │   ├── 📄 service_reflection.py
│   │   │       │   │   ├── 📄 source_context_pb2.py
│   │   │       │   │   ├── 📄 struct_pb2.py
│   │   │       │   │   ├── 📄 symbol_database.py
│   │   │       │   │   ├── 📄 text_encoding.py
│   │   │       │   │   ├── 📄 text_format.py
│   │   │       │   │   ├── 📄 timestamp_pb2.py
│   │   │       │   │   ├── 📄 timestamp.py
│   │   │       │   │   ├── 📄 type_pb2.py
│   │   │       │   │   ├── 📄 unknown_fields.py
│   │   │       │   │   └── 📄 wrappers_pb2.py
│   │   │       │   ├── 📁 rpc/
│   │   │       │   │   ├── 📁 context/
│   │   │       │   │   │   ├── 📄 attribute_context_pb2.py
│   │   │       │   │   │   ├── 📄 attribute_context_pb2.pyi
│   │   │       │   │   │   ├── 📄 attribute_context.proto
│   │   │       │   │   │   ├── 📄 audit_context_pb2.py
│   │   │       │   │   │   ├── 📄 audit_context_pb2.pyi
│   │   │       │   │   │   └── 📄 audit_context.proto
│   │   │       │   │   ├── 📄 code_pb2.py
│   │   │       │   │   ├── 📄 code_pb2.pyi
│   │   │       │   │   ├── 📄 code.proto
│   │   │       │   │   ├── 📄 error_details_pb2.py
│   │   │       │   │   ├── 📄 error_details_pb2.pyi
│   │   │       │   │   ├── 📄 error_details.proto
│   │   │       │   │   ├── 📄 http_pb2.py
│   │   │       │   │   ├── 📄 http_pb2.pyi
│   │   │       │   │   ├── 📄 http.proto
│   │   │       │   │   ├── 📄 status_pb2.py
│   │   │       │   │   ├── 📄 status_pb2.pyi
│   │   │       │   │   └── 📄 status.proto
│   │   │       │   └── 📁 type/
│   │   │       │       ├── 📄 calendar_period_pb2.py
│   │   │       │       ├── 📄 calendar_period_pb2.pyi
│   │   │       │       ├── 📄 calendar_period.proto
│   │   │       │       ├── 📄 color_pb2.py
│   │   │       │       ├── 📄 color_pb2.pyi
│   │   │       │       ├── 📄 color.proto
│   │   │       │       ├── 📄 date_pb2.py
│   │   │       │       ├── 📄 date_pb2.pyi
│   │   │       │       ├── 📄 date.proto
│   │   │       │       ├── 📄 datetime_pb2.py
│   │   │       │       ├── 📄 datetime_pb2.pyi
│   │   │       │       ├── 📄 datetime.proto
│   │   │       │       ├── 📄 dayofweek_pb2.py
│   │   │       │       ├── 📄 dayofweek_pb2.pyi
│   │   │       │       ├── 📄 dayofweek.proto
│   │   │       │       ├── 📄 decimal_pb2.py
│   │   │       │       ├── 📄 decimal_pb2.pyi
│   │   │       │       ├── 📄 decimal.proto
│   │   │       │       ├── 📄 expr_pb2.py
│   │   │       │       ├── 📄 expr_pb2.pyi
│   │   │       │       ├── 📄 expr.proto
│   │   │       │       ├── 📄 fraction_pb2.py
│   │   │       │       ├── 📄 fraction_pb2.pyi
│   │   │       │       ├── 📄 fraction.proto
│   │   │       │       ├── 📄 interval_pb2.py
│   │   │       │       ├── 📄 interval_pb2.pyi
│   │   │       │       ├── 📄 interval.proto
│   │   │       │       ├── 📄 latlng_pb2.py
│   │   │       │       ├── 📄 latlng_pb2.pyi
│   │   │       │       ├── 📄 latlng.proto
│   │   │       │       ├── 📄 localized_text_pb2.py
│   │   │       │       ├── 📄 localized_text_pb2.pyi
│   │   │       │       ├── 📄 localized_text.proto
│   │   │       │       ├── 📄 money_pb2.py
│   │   │       │       ├── 📄 money_pb2.pyi
│   │   │       │       ├── 📄 money.proto
│   │   │       │       ├── 📄 month_pb2.py
│   │   │       │       ├── 📄 month_pb2.pyi
│   │   │       │       ├── 📄 month.proto
│   │   │       │       ├── 📄 phone_number_pb2.py
│   │   │       │       ├── 📄 phone_number_pb2.pyi
│   │   │       │       ├── 📄 phone_number.proto
│   │   │       │       ├── 📄 postal_address_pb2.py
│   │   │       │       ├── 📄 postal_address_pb2.pyi
│   │   │       │       ├── 📄 postal_address.proto
│   │   │       │       ├── 📄 quaternion_pb2.py
│   │   │       │       ├── 📄 quaternion_pb2.pyi
│   │   │       │       ├── 📄 quaternion.proto
│   │   │       │       ├── 📄 timeofday_pb2.py
│   │   │       │       ├── 📄 timeofday_pb2.pyi
│   │   │       │       └── 📄 timeofday.proto
│   │   │       ├── 📁 google_api_core-2.27.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 google_api_python_client-2.185.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 google_auth_httplib2-0.2.0.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 google_auth_oauthlib/
│   │   │       │   ├── 📁 tool/
│   │   │       │   ├── 📄 flow.py
│   │   │       │   ├── 📄 helpers.py
│   │   │       │   └── 📄 interactive.py
│   │   │       ├── 📁 google_auth_oauthlib-1.2.2.dist-info/
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 google_auth-2.41.1.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 googleapiclient/
│   │   │       │   ├── 📁 discovery_cache/
│   │   │       │   │   ├── 📁 documents/
│   │   │       │   │   │   ├── 📋 abusiveexperiencereport.v1.json
│   │   │       │   │   │   ├── 📋 acceleratedmobilepageurl.v1.json
│   │   │       │   │   │   ├── 📋 accessapproval.v1.json
│   │   │       │   │   │   ├── 📋 accesscontextmanager.v1.json
│   │   │       │   │   │   ├── 📋 accesscontextmanager.v1beta.json
│   │   │       │   │   │   ├── 📋 acmedns.v1.json
│   │   │       │   │   │   ├── 📋 addressvalidation.v1.json
│   │   │       │   │   │   ├── 📋 adexchangebuyer.v1.2.json
│   │   │       │   │   │   ├── 📋 adexchangebuyer.v1.3.json
│   │   │       │   │   │   ├── 📋 adexchangebuyer.v1.4.json
│   │   │       │   │   │   ├── 📋 adexchangebuyer2.v2beta1.json
│   │   │       │   │   │   ├── 📋 adexperiencereport.v1.json
│   │   │       │   │   │   ├── 📋 admin.datatransfer_v1.json
│   │   │       │   │   │   ├── 📋 admin.datatransferv1.json
│   │   │       │   │   │   ├── 📋 admin.directory_v1.json
│   │   │       │   │   │   ├── 📋 admin.directoryv1.json
│   │   │       │   │   │   ├── 📋 admin.reports_v1.json
│   │   │       │   │   │   ├── 📋 admin.reportsv1.json
│   │   │       │   │   │   ├── 📋 admob.v1.json
│   │   │       │   │   │   ├── 📋 admob.v1beta.json
│   │   │       │   │   │   ├── 📋 adsense.v2.json
│   │   │       │   │   │   ├── 📋 adsensehost.v4.1.json
│   │   │       │   │   │   ├── 📋 adsenseplatform.v1.json
│   │   │       │   │   │   ├── 📋 adsenseplatform.v1alpha.json
│   │   │       │   │   │   ├── 📋 advisorynotifications.v1.json
│   │   │       │   │   │   ├── 📋 aiplatform.v1.json
│   │   │       │   │   │   ├── 📋 aiplatform.v1beta1.json
│   │   │       │   │   │   ├── 📋 airquality.v1.json
│   │   │       │   │   │   ├── 📋 alertcenter.v1beta1.json
│   │   │       │   │   │   ├── 📋 alloydb.v1.json
│   │   │       │   │   │   ├── 📋 alloydb.v1alpha.json
│   │   │       │   │   │   ├── 📋 alloydb.v1beta.json
│   │   │       │   │   │   ├── 📋 analytics.v3.json
│   │   │       │   │   │   ├── 📋 analyticsadmin.v1alpha.json
│   │   │       │   │   │   ├── 📋 analyticsadmin.v1beta.json
│   │   │       │   │   │   ├── 📋 analyticsdata.v1alpha.json
│   │   │       │   │   │   ├── 📋 analyticsdata.v1beta.json
│   │   │       │   │   │   ├── 📋 analyticshub.v1.json
│   │   │       │   │   │   ├── 📋 analyticshub.v1beta1.json
│   │   │       │   │   │   ├── 📋 analyticsreporting.v4.json
│   │   │       │   │   │   ├── 📋 androiddeviceprovisioning.v1.json
│   │   │       │   │   │   ├── 📋 androidenterprise.v1.json
│   │   │       │   │   │   ├── 📋 androidmanagement.v1.json
│   │   │       │   │   │   ├── 📋 androidpublisher.v3.json
│   │   │       │   │   │   ├── 📋 apigateway.v1.json
│   │   │       │   │   │   ├── 📋 apigateway.v1beta.json
│   │   │       │   │   │   ├── 📋 apigee.v1.json
│   │   │       │   │   │   ├── 📋 apigeeregistry.v1.json
│   │   │       │   │   │   ├── 📋 apihub.v1.json
│   │   │       │   │   │   ├── 📋 apikeys.v2.json
│   │   │       │   │   │   ├── 📋 apim.v1alpha.json
│   │   │       │   │   │   ├── 📋 appengine.v1.json
│   │   │       │   │   │   ├── 📋 appengine.v1alpha.json
│   │   │       │   │   │   ├── 📋 appengine.v1beta.json
│   │   │       │   │   │   ├── 📋 appengine.v1beta4.json
│   │   │       │   │   │   ├── 📋 appengine.v1beta5.json
│   │   │       │   │   │   ├── 📋 apphub.v1.json
│   │   │       │   │   │   ├── 📋 apphub.v1alpha.json
│   │   │       │   │   │   ├── 📋 area120tables.v1alpha1.json
│   │   │       │   │   │   ├── 📋 areainsights.v1.json
│   │   │       │   │   │   ├── 📋 artifactregistry.v1.json
│   │   │       │   │   │   ├── 📋 artifactregistry.v1beta1.json
│   │   │       │   │   │   ├── 📋 artifactregistry.v1beta2.json
│   │   │       │   │   │   ├── 📋 assuredworkloads.v1.json
│   │   │       │   │   │   ├── 📋 assuredworkloads.v1beta1.json
│   │   │       │   │   │   ├── 📋 authorizedbuyersmarketplace.v1.json
│   │   │       │   │   │   ├── 📋 authorizedbuyersmarketplace.v1alpha.json
│   │   │       │   │   │   ├── 📋 authorizedbuyersmarketplace.v1beta.json
│   │   │       │   │   │   ├── 📋 backupdr.v1.json
│   │   │       │   │   │   ├── 📋 baremetalsolution.v1.json
│   │   │       │   │   │   ├── 📋 baremetalsolution.v1alpha1.json
│   │   │       │   │   │   ├── 📋 baremetalsolution.v2.json
│   │   │       │   │   │   ├── 📋 batch.v1.json
│   │   │       │   │   │   ├── 📋 beyondcorp.v1.json
│   │   │       │   │   │   ├── 📋 beyondcorp.v1alpha.json
│   │   │       │   │   │   ├── 📋 biglake.v1.json
│   │   │       │   │   │   ├── 📋 bigquery.v2.json
│   │   │       │   │   │   ├── 📋 bigqueryconnection.v1.json
│   │   │       │   │   │   ├── 📋 bigqueryconnection.v1beta1.json
│   │   │       │   │   │   ├── 📋 bigquerydatapolicy.v1.json
│   │   │       │   │   │   ├── 📋 bigquerydatatransfer.v1.json
│   │   │       │   │   │   ├── 📋 bigqueryreservation.v1.json
│   │   │       │   │   │   ├── 📋 bigqueryreservation.v1alpha2.json
│   │   │       │   │   │   ├── 📋 bigqueryreservation.v1beta1.json
│   │   │       │   │   │   ├── 📋 bigtableadmin.v1.json
│   │   │       │   │   │   ├── 📋 bigtableadmin.v2.json
│   │   │       │   │   │   ├── 📋 billingbudgets.v1.json
│   │   │       │   │   │   ├── 📋 billingbudgets.v1beta1.json
│   │   │       │   │   │   ├── 📋 binaryauthorization.v1.json
│   │   │       │   │   │   ├── 📋 binaryauthorization.v1beta1.json
│   │   │       │   │   │   ├── 📋 blockchainnodeengine.v1.json
│   │   │       │   │   │   ├── 📋 blogger.v2.json
│   │   │       │   │   │   ├── 📋 blogger.v3.json
│   │   │       │   │   │   ├── 📋 books.v1.json
│   │   │       │   │   │   ├── 📋 businessprofileperformance.v1.json
│   │   │       │   │   │   ├── 📋 calendar.v3.json
│   │   │       │   │   │   ├── 📋 certificatemanager.v1.json
│   │   │       │   │   │   ├── 📋 chat.v1.json
│   │   │       │   │   │   ├── 📋 checks.v1alpha.json
│   │   │       │   │   │   ├── 📋 chromemanagement.v1.json
│   │   │       │   │   │   ├── 📋 chromepolicy.v1.json
│   │   │       │   │   │   ├── 📋 chromeuxreport.v1.json
│   │   │       │   │   │   ├── 📋 chromewebstore.v1.1.json
│   │   │       │   │   │   ├── 📋 civicinfo.v2.json
│   │   │       │   │   │   ├── 📋 classroom.v1.json
│   │   │       │   │   │   ├── 📋 cloudasset.v1.json
│   │   │       │   │   │   ├── 📋 cloudasset.v1beta1.json
│   │   │       │   │   │   ├── 📋 cloudasset.v1p1beta1.json
│   │   │       │   │   │   ├── 📋 cloudasset.v1p4beta1.json
│   │   │       │   │   │   ├── 📋 cloudasset.v1p5beta1.json
│   │   │       │   │   │   ├── 📋 cloudasset.v1p7beta1.json
│   │   │       │   │   │   ├── 📋 cloudbilling.v1.json
│   │   │       │   │   │   ├── 📋 cloudbilling.v1beta.json
│   │   │       │   │   │   ├── 📋 cloudbuild.v1.json
│   │   │       │   │   │   ├── 📋 cloudbuild.v1alpha1.json
│   │   │       │   │   │   ├── 📋 cloudbuild.v1alpha2.json
│   │   │       │   │   │   ├── 📋 cloudbuild.v1beta1.json
│   │   │       │   │   │   ├── 📋 cloudbuild.v2.json
│   │   │       │   │   │   ├── 📋 cloudchannel.v1.json
│   │   │       │   │   │   ├── 📋 cloudcommerceprocurement.v1.json
│   │   │       │   │   │   ├── 📋 cloudcontrolspartner.v1.json
│   │   │       │   │   │   ├── 📋 cloudcontrolspartner.v1beta.json
│   │   │       │   │   │   ├── 📋 clouddebugger.v2.json
│   │   │       │   │   │   ├── 📋 clouddeploy.v1.json
│   │   │       │   │   │   ├── 📋 clouderrorreporting.v1beta1.json
│   │   │       │   │   │   ├── 📋 cloudfunctions.v1.json
│   │   │       │   │   │   ├── 📋 cloudfunctions.v2.json
│   │   │       │   │   │   ├── 📋 cloudfunctions.v2alpha.json
│   │   │       │   │   │   ├── 📋 cloudfunctions.v2beta.json
│   │   │       │   │   │   ├── 📋 cloudidentity.v1.json
│   │   │       │   │   │   ├── 📋 cloudidentity.v1beta1.json
│   │   │       │   │   │   ├── 📋 cloudiot.v1.json
│   │   │       │   │   │   ├── 📋 cloudkms.v1.json
│   │   │       │   │   │   ├── 📋 cloudlocationfinder.v1.json
│   │   │       │   │   │   ├── 📋 cloudlocationfinder.v1alpha.json
│   │   │       │   │   │   ├── 📋 cloudprofiler.v2.json
│   │   │       │   │   │   ├── 📋 cloudresourcemanager.v1.json
│   │   │       │   │   │   ├── 📋 cloudresourcemanager.v1beta1.json
│   │   │       │   │   │   ├── 📋 cloudresourcemanager.v2.json
│   │   │       │   │   │   ├── 📋 cloudresourcemanager.v2beta1.json
│   │   │       │   │   │   ├── 📋 cloudresourcemanager.v3.json
│   │   │       │   │   │   ├── 📋 cloudscheduler.v1.json
│   │   │       │   │   │   ├── 📋 cloudscheduler.v1beta1.json
│   │   │       │   │   │   ├── 📋 cloudsearch.v1.json
│   │   │       │   │   │   ├── 📋 cloudshell.v1.json
│   │   │       │   │   │   ├── 📋 cloudshell.v1alpha1.json
│   │   │       │   │   │   ├── 📋 cloudsupport.v2.json
│   │   │       │   │   │   ├── 📋 cloudsupport.v2beta.json
│   │   │       │   │   │   ├── 📋 cloudtasks.v2.json
│   │   │       │   │   │   ├── 📋 cloudtasks.v2beta2.json
│   │   │       │   │   │   ├── 📋 cloudtasks.v2beta3.json
│   │   │       │   │   │   ├── 📋 cloudtrace.v1.json
│   │   │       │   │   │   ├── 📋 cloudtrace.v2.json
│   │   │       │   │   │   ├── 📋 cloudtrace.v2beta1.json
│   │   │       │   │   │   ├── 📋 composer.v1.json
│   │   │       │   │   │   ├── 📋 composer.v1beta1.json
│   │   │       │   │   │   ├── 📋 compute.alpha.json
│   │   │       │   │   │   ├── 📋 compute.beta.json
│   │   │       │   │   │   ├── 📋 compute.v1.json
│   │   │       │   │   │   ├── 📋 config.v1.json
│   │   │       │   │   │   ├── 📋 connectors.v1.json
│   │   │       │   │   │   ├── 📋 connectors.v2.json
│   │   │       │   │   │   ├── 📋 contactcenteraiplatform.v1alpha1.json
│   │   │       │   │   │   ├── 📋 contactcenterinsights.v1.json
│   │   │       │   │   │   ├── 📋 container.v1.json
│   │   │       │   │   │   ├── 📋 container.v1beta1.json
│   │   │       │   │   │   ├── 📋 containeranalysis.v1.json
│   │   │       │   │   │   ├── 📋 containeranalysis.v1alpha1.json
│   │   │       │   │   │   ├── 📋 containeranalysis.v1beta1.json
│   │   │       │   │   │   ├── 📋 content.v2.1.json
│   │   │       │   │   │   ├── 📋 content.v2.json
│   │   │       │   │   │   ├── 📋 contentwarehouse.v1.json
│   │   │       │   │   │   ├── 📋 css.v1.json
│   │   │       │   │   │   ├── 📋 customsearch.v1.json
│   │   │       │   │   │   ├── 📋 datacatalog.v1.json
│   │   │       │   │   │   ├── 📋 datacatalog.v1beta1.json
│   │   │       │   │   │   ├── 📋 dataflow.v1b3.json
│   │   │       │   │   │   ├── 📋 dataform.v1beta1.json
│   │   │       │   │   │   ├── 📋 datafusion.v1.json
│   │   │       │   │   │   ├── 📋 datafusion.v1beta1.json
│   │   │       │   │   │   ├── 📋 datalabeling.v1beta1.json
│   │   │       │   │   │   ├── 📋 datalineage.v1.json
│   │   │       │   │   │   ├── 📋 datamanager.v1.json
│   │   │       │   │   │   ├── 📋 datamigration.v1.json
│   │   │       │   │   │   ├── 📋 datamigration.v1beta1.json
│   │   │       │   │   │   ├── 📋 datapipelines.v1.json
│   │   │       │   │   │   ├── 📋 dataplex.v1.json
│   │   │       │   │   │   ├── 📋 dataportability.v1.json
│   │   │       │   │   │   ├── 📋 dataportability.v1beta.json
│   │   │       │   │   │   ├── 📋 dataproc.v1.json
│   │   │       │   │   │   ├── 📋 dataproc.v1beta2.json
│   │   │       │   │   │   ├── 📋 datastore.v1.json
│   │   │       │   │   │   ├── 📋 datastore.v1beta1.json
│   │   │       │   │   │   ├── 📋 datastore.v1beta3.json
│   │   │       │   │   │   ├── 📋 datastream.v1.json
│   │   │       │   │   │   ├── 📋 datastream.v1alpha1.json
│   │   │       │   │   │   ├── 📋 deploymentmanager.alpha.json
│   │   │       │   │   │   ├── 📋 deploymentmanager.v2.json
│   │   │       │   │   │   ├── 📋 deploymentmanager.v2beta.json
│   │   │       │   │   │   ├── 📋 developerconnect.v1.json
│   │   │       │   │   │   ├── 📋 dfareporting.v3.3.json
│   │   │       │   │   │   ├── 📋 dfareporting.v3.4.json
│   │   │       │   │   │   ├── 📋 dfareporting.v3.5.json
│   │   │       │   │   │   ├── 📋 dfareporting.v4.json
│   │   │       │   │   │   ├── 📋 dfareporting.v5.json
│   │   │       │   │   │   ├── 📋 dialogflow.v2.json
│   │   │       │   │   │   ├── 📋 dialogflow.v2beta1.json
│   │   │       │   │   │   ├── 📋 dialogflow.v3.json
│   │   │       │   │   │   ├── 📋 dialogflow.v3beta1.json
│   │   │       │   │   │   ├── 📋 digitalassetlinks.v1.json
│   │   │       │   │   │   ├── 📋 discovery.v1.json
│   │   │       │   │   │   ├── 📋 discoveryengine.v1.json
│   │   │       │   │   │   ├── 📋 discoveryengine.v1alpha.json
│   │   │       │   │   │   ├── 📋 discoveryengine.v1beta.json
│   │   │       │   │   │   ├── 📋 displayvideo.v1.json
│   │   │       │   │   │   ├── 📋 displayvideo.v2.json
│   │   │       │   │   │   ├── 📋 displayvideo.v3.json
│   │   │       │   │   │   ├── 📋 displayvideo.v4.json
│   │   │       │   │   │   ├── 📋 dlp.v2.json
│   │   │       │   │   │   ├── 📋 dns.v1.json
│   │   │       │   │   │   ├── 📋 dns.v1beta2.json
│   │   │       │   │   │   ├── 📋 dns.v2.json
│   │   │       │   │   │   ├── 📋 docs.v1.json
│   │   │       │   │   │   ├── 📋 documentai.v1.json
│   │   │       │   │   │   ├── 📋 documentai.v1beta2.json
│   │   │       │   │   │   ├── 📋 documentai.v1beta3.json
│   │   │       │   │   │   ├── 📋 domains.v1.json
│   │   │       │   │   │   ├── 📋 domains.v1alpha2.json
│   │   │       │   │   │   ├── 📋 domains.v1beta1.json
│   │   │       │   │   │   ├── 📋 domainsrdap.v1.json
│   │   │       │   │   │   ├── 📋 doubleclickbidmanager.v1.1.json
│   │   │       │   │   │   ├── 📋 doubleclickbidmanager.v1.json
│   │   │       │   │   │   ├── 📋 doubleclickbidmanager.v2.json
│   │   │       │   │   │   ├── 📋 doubleclicksearch.v2.json
│   │   │       │   │   │   ├── 📋 drive.v2.json
│   │   │       │   │   │   ├── 📋 drive.v3.json
│   │   │       │   │   │   ├── 📋 driveactivity.v2.json
│   │   │       │   │   │   ├── 📋 drivelabels.v2.json
│   │   │       │   │   │   ├── 📋 drivelabels.v2beta.json
│   │   │       │   │   │   ├── 📋 essentialcontacts.v1.json
│   │   │       │   │   │   ├── 📋 eventarc.v1.json
│   │   │       │   │   │   ├── 📋 eventarc.v1beta1.json
│   │   │       │   │   │   ├── 📋 factchecktools.v1alpha1.json
│   │   │       │   │   │   ├── 📋 fcm.v1.json
│   │   │       │   │   │   ├── 📋 fcmdata.v1beta1.json
│   │   │       │   │   │   ├── 📋 file.v1.json
│   │   │       │   │   │   ├── 📋 file.v1beta1.json
│   │   │       │   │   │   ├── 📋 firebase.v1beta1.json
│   │   │       │   │   │   ├── 📋 firebaseappcheck.v1.json
│   │   │       │   │   │   ├── 📋 firebaseappcheck.v1beta.json
│   │   │       │   │   │   ├── 📋 firebaseappdistribution.v1.json
│   │   │       │   │   │   ├── 📋 firebaseappdistribution.v1alpha.json
│   │   │       │   │   │   ├── 📋 firebaseapphosting.v1.json
│   │   │       │   │   │   ├── 📋 firebaseapphosting.v1beta.json
│   │   │       │   │   │   ├── 📋 firebasedatabase.v1beta.json
│   │   │       │   │   │   ├── 📋 firebasedataconnect.v1.json
│   │   │       │   │   │   ├── 📋 firebasedataconnect.v1beta.json
│   │   │       │   │   │   ├── 📋 firebasedynamiclinks.v1.json
│   │   │       │   │   │   ├── 📋 firebasehosting.v1.json
│   │   │       │   │   │   ├── 📋 firebasehosting.v1beta1.json
│   │   │       │   │   │   ├── 📋 firebaseml.v1.json
│   │   │       │   │   │   ├── 📋 firebaseml.v1beta2.json
│   │   │       │   │   │   ├── 📋 firebaseml.v2beta.json
│   │   │       │   │   │   ├── 📋 firebaserules.v1.json
│   │   │       │   │   │   ├── 📋 firebasestorage.v1beta.json
│   │   │       │   │   │   ├── 📋 firestore.v1.json
│   │   │       │   │   │   ├── 📋 firestore.v1beta1.json
│   │   │       │   │   │   ├── 📋 firestore.v1beta2.json
│   │   │       │   │   │   ├── 📋 fitness.v1.json
│   │   │       │   │   │   ├── 📋 forms.v1.json
│   │   │       │   │   │   ├── 📋 games.v1.json
│   │   │       │   │   │   ├── 📋 gamesConfiguration.v1configuration.json
│   │   │       │   │   │   ├── 📋 gameservices.v1.json
│   │   │       │   │   │   ├── 📋 gameservices.v1beta.json
│   │   │       │   │   │   ├── 📋 gamesManagement.v1management.json
│   │   │       │   │   │   ├── 📋 genomics.v1.json
│   │   │       │   │   │   ├── 📋 genomics.v1alpha2.json
│   │   │       │   │   │   ├── 📋 genomics.v2alpha1.json
│   │   │       │   │   │   ├── 📋 gkebackup.v1.json
│   │   │       │   │   │   ├── 📋 gkehub.v1.json
│   │   │       │   │   │   ├── 📋 gkehub.v1alpha.json
│   │   │       │   │   │   ├── 📋 gkehub.v1alpha2.json
│   │   │       │   │   │   ├── 📋 gkehub.v1beta.json
│   │   │       │   │   │   ├── 📋 gkehub.v1beta1.json
│   │   │       │   │   │   ├── 📋 gkehub.v2.json
│   │   │       │   │   │   ├── 📋 gkehub.v2alpha.json
│   │   │       │   │   │   ├── 📋 gkehub.v2beta.json
│   │   │       │   │   │   ├── 📋 gkeonprem.v1.json
│   │   │       │   │   │   ├── 📋 gmail.v1.json
│   │   │       │   │   │   ├── 📋 gmailpostmastertools.v1.json
│   │   │       │   │   │   ├── 📋 gmailpostmastertools.v1beta1.json
│   │   │       │   │   │   ├── 📋 groupsmigration.v1.json
│   │   │       │   │   │   ├── 📋 groupssettings.v1.json
│   │   │       │   │   │   ├── 📋 healthcare.v1.json
│   │   │       │   │   │   ├── 📋 healthcare.v1beta1.json
│   │   │       │   │   │   ├── 📋 homegraph.v1.json
│   │   │       │   │   │   ├── 📋 iam.v1.json
│   │   │       │   │   │   ├── 📋 iam.v2.json
│   │   │       │   │   │   ├── 📋 iam.v2beta.json
│   │   │       │   │   │   ├── 📋 iamcredentials.v1.json
│   │   │       │   │   │   ├── 📋 iap.v1.json
│   │   │       │   │   │   ├── 📋 iap.v1beta1.json
│   │   │       │   │   │   ├── 📋 ideahub.v1alpha.json
│   │   │       │   │   │   ├── 📋 ideahub.v1beta.json
│   │   │       │   │   │   ├── 📋 identitytoolkit.v1.json
│   │   │       │   │   │   ├── 📋 identitytoolkit.v2.json
│   │   │       │   │   │   ├── 📋 identitytoolkit.v3.json
│   │   │       │   │   │   ├── 📋 ids.v1.json
│   │   │       │   │   │   ├── 📋 index.json
│   │   │       │   │   │   ├── 📋 indexing.v3.json
│   │   │       │   │   │   ├── 📋 integrations.v1.json
│   │   │       │   │   │   ├── 📋 integrations.v1alpha.json
│   │   │       │   │   │   ├── 📋 jobs.v2.json
│   │   │       │   │   │   ├── 📋 jobs.v3.json
│   │   │       │   │   │   ├── 📋 jobs.v3p1beta1.json
│   │   │       │   │   │   ├── 📋 jobs.v4.json
│   │   │       │   │   │   ├── 📋 keep.v1.json
│   │   │       │   │   │   ├── 📋 kgsearch.v1.json
│   │   │       │   │   │   ├── 📋 kmsinventory.v1.json
│   │   │       │   │   │   ├── 📋 language.v1.json
│   │   │       │   │   │   ├── 📋 language.v1beta1.json
│   │   │       │   │   │   ├── 📋 language.v1beta2.json
│   │   │       │   │   │   ├── 📋 language.v2.json
│   │   │       │   │   │   ├── 📋 libraryagent.v1.json
│   │   │       │   │   │   ├── 📋 licensing.v1.json
│   │   │       │   │   │   ├── 📋 lifesciences.v2beta.json
│   │   │       │   │   │   ├── 📋 localservices.v1.json
│   │   │       │   │   │   ├── 📋 logging.v2.json
│   │   │       │   │   │   ├── 📋 looker.v1.json
│   │   │       │   │   │   ├── 📋 managedidentities.v1.json
│   │   │       │   │   │   ├── 📋 managedidentities.v1alpha1.json
│   │   │       │   │   │   ├── 📋 managedidentities.v1beta1.json
│   │   │       │   │   │   ├── 📋 managedkafka.v1.json
│   │   │       │   │   │   ├── 📋 manufacturers.v1.json
│   │   │       │   │   │   ├── 📋 marketingplatformadmin.v1alpha.json
│   │   │       │   │   │   ├── 📋 meet.v2.json
│   │   │       │   │   │   ├── 📋 memcache.v1.json
│   │   │       │   │   │   ├── 📋 memcache.v1beta2.json
│   │   │       │   │   │   ├── 📋 merchantapi.accounts_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.accounts_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.conversions_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.conversions_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.datasources_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.datasources_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.inventories_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.inventories_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.issueresolution_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.issueresolution_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.lfp_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.lfp_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.notifications_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.notifications_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.ordertracking_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.ordertracking_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.products_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.products_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.promotions_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.promotions_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.quota_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.quota_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.reports_v1.json
│   │   │       │   │   │   ├── 📋 merchantapi.reports_v1beta.json
│   │   │       │   │   │   ├── 📋 merchantapi.reviews_v1beta.json
│   │   │       │   │   │   ├── 📋 metastore.v1.json
│   │   │       │   │   │   ├── 📋 metastore.v1alpha.json
│   │   │       │   │   │   ├── 📋 metastore.v1beta.json
│   │   │       │   │   │   ├── 📋 metastore.v2.json
│   │   │       │   │   │   ├── 📋 metastore.v2alpha.json
│   │   │       │   │   │   ├── 📋 metastore.v2beta.json
│   │   │       │   │   │   ├── 📋 migrationcenter.v1.json
│   │   │       │   │   │   ├── 📋 migrationcenter.v1alpha1.json
│   │   │       │   │   │   ├── 📋 ml.v1.json
│   │   │       │   │   │   ├── 📋 monitoring.v1.json
│   │   │       │   │   │   ├── 📋 monitoring.v3.json
│   │   │       │   │   │   ├── 📋 mybusinessaccountmanagement.v1.json
│   │   │       │   │   │   ├── 📋 mybusinessbusinesscalls.v1.json
│   │   │       │   │   │   ├── 📋 mybusinessbusinessinformation.v1.json
│   │   │       │   │   │   ├── 📋 mybusinesslodging.v1.json
│   │   │       │   │   │   ├── 📋 mybusinessnotifications.v1.json
│   │   │       │   │   │   ├── 📋 mybusinessplaceactions.v1.json
│   │   │       │   │   │   ├── 📋 mybusinessqanda.v1.json
│   │   │       │   │   │   ├── 📋 mybusinessverifications.v1.json
│   │   │       │   │   │   ├── 📋 netapp.v1.json
│   │   │       │   │   │   ├── 📋 netapp.v1beta1.json
│   │   │       │   │   │   ├── 📋 networkconnectivity.v1.json
│   │   │       │   │   │   ├── 📋 networkconnectivity.v1alpha1.json
│   │   │       │   │   │   ├── 📋 networkmanagement.v1.json
│   │   │       │   │   │   ├── 📋 networkmanagement.v1beta1.json
│   │   │       │   │   │   ├── 📋 networksecurity.v1.json
│   │   │       │   │   │   ├── 📋 networksecurity.v1beta1.json
│   │   │       │   │   │   ├── 📋 networkservices.v1.json
│   │   │       │   │   │   ├── 📋 networkservices.v1beta1.json
│   │   │       │   │   │   ├── 📋 notebooks.v1.json
│   │   │       │   │   │   ├── 📋 notebooks.v2.json
│   │   │       │   │   │   ├── 📋 oauth2.v2.json
│   │   │       │   │   │   ├── 📋 observability.v1.json
│   │   │       │   │   │   ├── 📋 ondemandscanning.v1.json
│   │   │       │   │   │   ├── 📋 ondemandscanning.v1beta1.json
│   │   │       │   │   │   ├── 📋 oracledatabase.v1.json
│   │   │       │   │   │   ├── 📋 orgpolicy.v2.json
│   │   │       │   │   │   ├── 📋 osconfig.v1.json
│   │   │       │   │   │   ├── 📋 osconfig.v1alpha.json
│   │   │       │   │   │   ├── 📋 osconfig.v1beta.json
│   │   │       │   │   │   ├── 📋 osconfig.v2.json
│   │   │       │   │   │   ├── 📋 osconfig.v2beta.json
│   │   │       │   │   │   ├── 📋 oslogin.v1.json
│   │   │       │   │   │   ├── 📋 oslogin.v1alpha.json
│   │   │       │   │   │   ├── 📋 oslogin.v1beta.json
│   │   │       │   │   │   ├── 📋 pagespeedonline.v5.json
│   │   │       │   │   │   ├── 📋 parallelstore.v1.json
│   │   │       │   │   │   ├── 📋 parallelstore.v1beta.json
│   │   │       │   │   │   ├── 📋 parametermanager.v1.json
│   │   │       │   │   │   ├── 📋 paymentsresellersubscription.v1.json
│   │   │       │   │   │   ├── 📋 people.v1.json
│   │   │       │   │   │   ├── 📋 places.v1.json
│   │   │       │   │   │   ├── 📋 playablelocations.v3.json
│   │   │       │   │   │   ├── 📋 playcustomapp.v1.json
│   │   │       │   │   │   ├── 📋 playdeveloperreporting.v1alpha1.json
│   │   │       │   │   │   ├── 📋 playdeveloperreporting.v1beta1.json
│   │   │       │   │   │   ├── 📋 playgrouping.v1alpha1.json
│   │   │       │   │   │   ├── 📋 playintegrity.v1.json
│   │   │       │   │   │   ├── 📋 policyanalyzer.v1.json
│   │   │       │   │   │   ├── 📋 policyanalyzer.v1beta1.json
│   │   │       │   │   │   ├── 📋 policysimulator.v1.json
│   │   │       │   │   │   ├── 📋 policysimulator.v1alpha.json
│   │   │       │   │   │   ├── 📋 policysimulator.v1beta.json
│   │   │       │   │   │   ├── 📋 policysimulator.v1beta1.json
│   │   │       │   │   │   ├── 📋 policytroubleshooter.v1.json
│   │   │       │   │   │   ├── 📋 policytroubleshooter.v1beta.json
│   │   │       │   │   │   ├── 📋 pollen.v1.json
│   │   │       │   │   │   ├── 📋 poly.v1.json
│   │   │       │   │   │   ├── 📋 privateca.v1.json
│   │   │       │   │   │   ├── 📋 privateca.v1beta1.json
│   │   │       │   │   │   ├── 📋 prod_tt_sasportal.v1alpha1.json
│   │   │       │   │   │   ├── 📋 publicca.v1.json
│   │   │       │   │   │   ├── 📋 publicca.v1alpha1.json
│   │   │       │   │   │   ├── 📋 publicca.v1beta1.json
│   │   │       │   │   │   ├── 📋 pubsub.v1.json
│   │   │       │   │   │   ├── 📋 pubsub.v1beta1a.json
│   │   │       │   │   │   ├── 📋 pubsub.v1beta2.json
│   │   │       │   │   │   ├── 📋 pubsublite.v1.json
│   │   │       │   │   │   ├── 📋 rapidmigrationassessment.v1.json
│   │   │       │   │   │   ├── 📋 readerrevenuesubscriptionlinking.v1.json
│   │   │       │   │   │   ├── 📋 realtimebidding.v1.json
│   │   │       │   │   │   ├── 📋 realtimebidding.v1alpha.json
│   │   │       │   │   │   ├── 📋 recaptchaenterprise.v1.json
│   │   │       │   │   │   ├── 📋 recommendationengine.v1beta1.json
│   │   │       │   │   │   ├── 📋 recommender.v1.json
│   │   │       │   │   │   ├── 📋 recommender.v1beta1.json
│   │   │       │   │   │   ├── 📋 redis.v1.json
│   │   │       │   │   │   ├── 📋 redis.v1beta1.json
│   │   │       │   │   │   ├── 📋 remotebuildexecution.v1.json
│   │   │       │   │   │   ├── 📋 remotebuildexecution.v1alpha.json
│   │   │       │   │   │   ├── 📋 remotebuildexecution.v2.json
│   │   │       │   │   │   ├── 📋 reseller.v1.json
│   │   │       │   │   │   ├── 📋 resourcesettings.v1.json
│   │   │       │   │   │   ├── 📋 retail.v2.json
│   │   │       │   │   │   ├── 📋 retail.v2alpha.json
│   │   │       │   │   │   ├── 📋 retail.v2beta.json
│   │   │       │   │   │   ├── 📋 run.v1.json
│   │   │       │   │   │   ├── 📋 run.v1alpha1.json
│   │   │       │   │   │   ├── 📋 run.v1beta1.json
│   │   │       │   │   │   ├── 📋 run.v2.json
│   │   │       │   │   │   ├── 📋 runtimeconfig.v1.json
│   │   │       │   │   │   ├── 📋 runtimeconfig.v1beta1.json
│   │   │       │   │   │   ├── 📋 saasservicemgmt.v1beta1.json
│   │   │       │   │   │   ├── 📋 safebrowsing.v4.json
│   │   │       │   │   │   ├── 📋 safebrowsing.v5.json
│   │   │       │   │   │   ├── 📋 sasportal.v1alpha1.json
│   │   │       │   │   │   ├── 📋 script.v1.json
│   │   │       │   │   │   ├── 📋 searchads360.v0.json
│   │   │       │   │   │   ├── 📋 searchconsole.v1.json
│   │   │       │   │   │   ├── 📋 secretmanager.v1.json
│   │   │       │   │   │   ├── 📋 secretmanager.v1beta1.json
│   │   │       │   │   │   ├── 📋 secretmanager.v1beta2.json
│   │   │       │   │   │   ├── 📋 securesourcemanager.v1.json
│   │   │       │   │   │   ├── 📋 securitycenter.v1.json
│   │   │       │   │   │   ├── 📋 securitycenter.v1beta1.json
│   │   │       │   │   │   ├── 📋 securitycenter.v1beta2.json
│   │   │       │   │   │   ├── 📋 securityposture.v1.json
│   │   │       │   │   │   ├── 📋 serviceconsumermanagement.v1.json
│   │   │       │   │   │   ├── 📋 serviceconsumermanagement.v1beta1.json
│   │   │       │   │   │   ├── 📋 servicecontrol.v1.json
│   │   │       │   │   │   ├── 📋 servicecontrol.v2.json
│   │   │       │   │   │   ├── 📋 servicedirectory.v1.json
│   │   │       │   │   │   ├── 📋 servicedirectory.v1beta1.json
│   │   │       │   │   │   ├── 📋 servicemanagement.v1.json
│   │   │       │   │   │   ├── 📋 servicenetworking.v1.json
│   │   │       │   │   │   ├── 📋 servicenetworking.v1beta.json
│   │   │       │   │   │   ├── 📋 serviceusage.v1.json
│   │   │       │   │   │   ├── 📋 serviceusage.v1beta1.json
│   │   │       │   │   │   ├── 📋 sheets.v4.json
│   │   │       │   │   │   ├── 📋 siteVerification.v1.json
│   │   │       │   │   │   ├── 📋 slides.v1.json
│   │   │       │   │   │   ├── 📋 smartdevicemanagement.v1.json
│   │   │       │   │   │   ├── 📋 solar.v1.json
│   │   │       │   │   │   ├── 📋 sourcerepo.v1.json
│   │   │       │   │   │   ├── 📋 spanner.v1.json
│   │   │       │   │   │   ├── 📋 speech.v1.json
│   │   │       │   │   │   ├── 📋 speech.v1p1beta1.json
│   │   │       │   │   │   ├── 📋 speech.v2beta1.json
│   │   │       │   │   │   ├── 📋 sqladmin.v1.json
│   │   │       │   │   │   ├── 📋 sqladmin.v1beta4.json
│   │   │       │   │   │   ├── 📋 storage.v1.json
│   │   │       │   │   │   ├── 📋 storagebatchoperations.v1.json
│   │   │       │   │   │   ├── 📋 storagetransfer.v1.json
│   │   │       │   │   │   ├── 📋 streetviewpublish.v1.json
│   │   │       │   │   │   ├── 📋 sts.v1.json
│   │   │       │   │   │   ├── 📋 sts.v1beta.json
│   │   │       │   │   │   ├── 📋 tagmanager.v1.json
│   │   │       │   │   │   ├── 📋 tagmanager.v2.json
│   │   │       │   │   │   ├── 📋 tasks.v1.json
│   │   │       │   │   │   ├── 📋 testing.v1.json
│   │   │       │   │   │   ├── 📋 texttospeech.v1.json
│   │   │       │   │   │   ├── 📋 texttospeech.v1beta1.json
│   │   │       │   │   │   ├── 📋 toolresults.v1beta3.json
│   │   │       │   │   │   ├── 📋 tpu.v1.json
│   │   │       │   │   │   ├── 📋 tpu.v1alpha1.json
│   │   │       │   │   │   ├── 📋 tpu.v2.json
│   │   │       │   │   │   ├── 📋 tpu.v2alpha1.json
│   │   │       │   │   │   ├── 📋 trafficdirector.v2.json
│   │   │       │   │   │   ├── 📋 trafficdirector.v3.json
│   │   │       │   │   │   ├── 📋 transcoder.v1.json
│   │   │       │   │   │   ├── 📋 transcoder.v1beta1.json
│   │   │       │   │   │   ├── 📋 translate.v2.json
│   │   │       │   │   │   ├── 📋 translate.v3.json
│   │   │       │   │   │   ├── 📋 translate.v3beta1.json
│   │   │       │   │   │   ├── 📋 travelimpactmodel.v1.json
│   │   │       │   │   │   ├── 📋 vault.v1.json
│   │   │       │   │   │   ├── 📋 vectortile.v1.json
│   │   │       │   │   │   ├── 📋 verifiedaccess.v1.json
│   │   │       │   │   │   ├── 📋 verifiedaccess.v2.json
│   │   │       │   │   │   ├── 📋 versionhistory.v1.json
│   │   │       │   │   │   ├── 📋 videointelligence.v1.json
│   │   │       │   │   │   ├── 📋 videointelligence.v1beta2.json
│   │   │       │   │   │   ├── 📋 videointelligence.v1p1beta1.json
│   │   │       │   │   │   ├── 📋 videointelligence.v1p2beta1.json
│   │   │       │   │   │   ├── 📋 videointelligence.v1p3beta1.json
│   │   │       │   │   │   ├── 📋 vision.v1.json
│   │   │       │   │   │   ├── 📋 vision.v1p1beta1.json
│   │   │       │   │   │   ├── 📋 vision.v1p2beta1.json
│   │   │       │   │   │   ├── 📋 vmmigration.v1.json
│   │   │       │   │   │   ├── 📋 vmmigration.v1alpha1.json
│   │   │       │   │   │   ├── 📋 vmwareengine.v1.json
│   │   │       │   │   │   ├── 📋 vpcaccess.v1.json
│   │   │       │   │   │   ├── 📋 vpcaccess.v1beta1.json
│   │   │       │   │   │   ├── 📋 walletobjects.v1.json
│   │   │       │   │   │   ├── 📋 webfonts.v1.json
│   │   │       │   │   │   ├── 📋 webmasters.v3.json
│   │   │       │   │   │   ├── 📋 webrisk.v1.json
│   │   │       │   │   │   ├── 📋 websecurityscanner.v1.json
│   │   │       │   │   │   ├── 📋 websecurityscanner.v1alpha.json
│   │   │       │   │   │   ├── 📋 websecurityscanner.v1beta.json
│   │   │       │   │   │   ├── 📋 workflowexecutions.v1.json
│   │   │       │   │   │   ├── 📋 workflowexecutions.v1beta.json
│   │   │       │   │   │   ├── 📋 workflows.v1.json
│   │   │       │   │   │   ├── 📋 workflows.v1beta.json
│   │   │       │   │   │   ├── 📋 workloadmanager.v1.json
│   │   │       │   │   │   ├── 📋 workspaceevents.v1.json
│   │   │       │   │   │   ├── 📋 workstations.v1.json
│   │   │       │   │   │   ├── 📋 workstations.v1beta.json
│   │   │       │   │   │   ├── 📋 youtube.v3.json
│   │   │       │   │   │   ├── 📋 youtubeAnalytics.v1.json
│   │   │       │   │   │   ├── 📋 youtubeAnalytics.v2.json
│   │   │       │   │   │   └── 📋 youtubereporting.v1.json
│   │   │       │   │   ├── 📄 appengine_memcache.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   └── 📄 file_cache.py
│   │   │       │   ├── 📄 channel.py
│   │   │       │   ├── 📄 discovery.py
│   │   │       │   ├── 📄 errors.py
│   │   │       │   ├── 📄 http.py
│   │   │       │   ├── 📄 mimeparse.py
│   │   │       │   ├── 📄 model.py
│   │   │       │   ├── 📄 sample_tools.py
│   │   │       │   ├── 📄 schema.py
│   │   │       │   └── 📄 version.py
│   │   │       ├── 📁 googleapis_common_protos-1.71.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 greenlet/
│   │   │       │   ├── 📁 platform/
│   │   │       │   │   ├── 📄 setup_switch_x64_masm.cmd
│   │   │       │   │   ├── 📄 switch_aarch64_gcc.h
│   │   │       │   │   ├── 📄 switch_alpha_unix.h
│   │   │       │   │   ├── 📄 switch_amd64_unix.h
│   │   │       │   │   ├── 📄 switch_arm32_gcc.h
│   │   │       │   │   ├── 📄 switch_arm32_ios.h
│   │   │       │   │   ├── 📄 switch_arm64_masm.asm
│   │   │       │   │   ├── 📄 switch_arm64_masm.obj
│   │   │       │   │   ├── 📄 switch_arm64_msvc.h
│   │   │       │   │   ├── 📄 switch_csky_gcc.h
│   │   │       │   │   ├── 📄 switch_loongarch64_linux.h
│   │   │       │   │   ├── 📄 switch_m68k_gcc.h
│   │   │       │   │   ├── 📄 switch_mips_unix.h
│   │   │       │   │   ├── 📄 switch_ppc_aix.h
│   │   │       │   │   ├── 📄 switch_ppc_linux.h
│   │   │       │   │   ├── 📄 switch_ppc_macosx.h
│   │   │       │   │   ├── 📄 switch_ppc_unix.h
│   │   │       │   │   ├── 📄 switch_ppc64_aix.h
│   │   │       │   │   ├── 📄 switch_ppc64_linux.h
│   │   │       │   │   ├── 📄 switch_riscv_unix.h
│   │   │       │   │   ├── 📄 switch_s390_unix.h
│   │   │       │   │   ├── 📄 switch_sh_gcc.h
│   │   │       │   │   ├── 📄 switch_sparc_sun_gcc.h
│   │   │       │   │   ├── 📄 switch_x32_unix.h
│   │   │       │   │   ├── 📄 switch_x64_masm.asm
│   │   │       │   │   ├── 📄 switch_x64_masm.obj
│   │   │       │   │   ├── 📄 switch_x64_msvc.h
│   │   │       │   │   ├── 📄 switch_x86_msvc.h
│   │   │       │   │   └── 📄 switch_x86_unix.h
│   │   │       │   ├── 📁 tests/
│   │   │       │   │   ├── 📄 fail_clearing_run_switches.py
│   │   │       │   │   ├── 📄 fail_cpp_exception.py
│   │   │       │   │   ├── 📄 fail_initialstub_already_started.py
│   │   │       │   │   ├── 📄 fail_slp_switch.py
│   │   │       │   │   ├── 📄 fail_switch_three_greenlets.py
│   │   │       │   │   ├── 📄 fail_switch_three_greenlets2.py
│   │   │       │   │   ├── 📄 fail_switch_two_greenlets.py
│   │   │       │   │   ├── 📄 leakcheck.py
│   │   │       │   │   ├── 📄 test_contextvars.py
│   │   │       │   │   ├── 📄 test_cpp.py
│   │   │       │   │   ├── 📄 test_extension_interface.py
│   │   │       │   │   ├── 📄 test_gc.py
│   │   │       │   │   ├── 📄 test_generator_nested.py
│   │   │       │   │   ├── 📄 test_generator.py
│   │   │       │   │   ├── 📄 test_greenlet_trash.py
│   │   │       │   │   ├── 📄 test_greenlet.py
│   │   │       │   │   ├── 📄 test_leaks.py
│   │   │       │   │   ├── 📄 test_stack_saved.py
│   │   │       │   │   ├── 📄 test_throw.py
│   │   │       │   │   ├── 📄 test_tracing.py
│   │   │       │   │   ├── 📄 test_version.py
│   │   │       │   │   └── 📄 test_weakref.py
│   │   │       │   ├── 📄 CObjects.cpp
│   │   │       │   ├── 📄 greenlet_allocator.hpp
│   │   │       │   ├── 📄 greenlet_compiler_compat.hpp
│   │   │       │   ├── 📄 greenlet_cpython_compat.hpp
│   │   │       │   ├── 📄 greenlet_exceptions.hpp
│   │   │       │   ├── 📄 greenlet_internal.hpp
│   │   │       │   ├── 📄 greenlet_msvc_compat.hpp
│   │   │       │   ├── 📄 greenlet_refs.hpp
│   │   │       │   ├── 📄 greenlet_slp_switch.hpp
│   │   │       │   ├── 📄 greenlet_thread_support.hpp
│   │   │       │   ├── 📄 greenlet.cpp
│   │   │       │   ├── 📄 greenlet.h
│   │   │       │   ├── 📄 PyGreenlet.cpp
│   │   │       │   ├── 📄 PyGreenlet.hpp
│   │   │       │   ├── 📄 PyGreenletUnswitchable.cpp
│   │   │       │   ├── 📄 PyModule.cpp
│   │   │       │   ├── 📄 slp_platformselect.h
│   │   │       │   ├── 📄 TBrokenGreenlet.cpp
│   │   │       │   ├── 📄 TExceptionState.cpp
│   │   │       │   ├── 📄 TGreenlet.cpp
│   │   │       │   ├── 📄 TGreenlet.hpp
│   │   │       │   ├── 📄 TGreenletGlobals.cpp
│   │   │       │   ├── 📄 TMainGreenlet.cpp
│   │   │       │   ├── 📄 TPythonState.cpp
│   │   │       │   ├── 📄 TStackState.cpp
│   │   │       │   ├── 📄 TThreadState.hpp
│   │   │       │   ├── 📄 TThreadStateCreator.hpp
│   │   │       │   ├── 📄 TThreadStateDestroy.cpp
│   │   │       │   └── 📄 TUserGreenlet.cpp
│   │   │       ├── 📁 greenlet-3.2.4.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   ├── 📄 LICENSE
│   │   │       │   │   └── 📄 LICENSE.PSF
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 h11/
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 h11-0.16.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 httpcore/
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 httpcore-1.0.9.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📝 LICENSE.md
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 httplib2/
│   │   │       │   ├── 📄 auth.py
│   │   │       │   ├── 📄 cacerts.txt
│   │   │       │   ├── 📄 certs.py
│   │   │       │   ├── 📄 error.py
│   │   │       │   └── 📄 iri2uri.py
│   │   │       ├── 📁 httplib2-0.31.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 httpx/
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 httpx-0.28.1.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📝 LICENSE.md
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 idna/
│   │   │       │   ├── 📄 codec.py
│   │   │       │   ├── 📄 compat.py
│   │   │       │   ├── 📄 core.py
│   │   │       │   ├── 📄 idnadata.py
│   │   │       │   ├── 📄 intranges.py
│   │   │       │   ├── 📄 package_data.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   └── 📄 uts46data.py
│   │   │       ├── 📁 idna-3.11.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📝 LICENSE.md
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 jose/
│   │   │       │   ├── 📁 backends/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 cryptography_backend.py
│   │   │       │   │   ├── 📄 ecdsa_backend.py
│   │   │       │   │   ├── 📄 native.py
│   │   │       │   │   └── 📄 rsa_backend.py
│   │   │       │   ├── 📄 constants.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 jwe.py
│   │   │       │   ├── 📄 jwk.py
│   │   │       │   ├── 📄 jws.py
│   │   │       │   ├── 📄 jwt.py
│   │   │       │   └── 📄 utils.py
│   │   │       ├── 📁 mako/
│   │   │       │   ├── 📁 ext/
│   │   │       │   │   ├── 📄 autohandler.py
│   │   │       │   │   ├── 📄 babelplugin.py
│   │   │       │   │   ├── 📄 beaker_cache.py
│   │   │       │   │   ├── 📄 extract.py
│   │   │       │   │   ├── 📄 linguaplugin.py
│   │   │       │   │   ├── 📄 preprocessors.py
│   │   │       │   │   ├── 📄 pygmentplugin.py
│   │   │       │   │   └── 📄 turbogears.py
│   │   │       │   ├── 📁 testing/
│   │   │       │   │   ├── 📄 assertions.py
│   │   │       │   │   ├── 📄 config.py
│   │   │       │   │   ├── 📄 exclusions.py
│   │   │       │   │   ├── 📄 fixtures.py
│   │   │       │   │   └── 📄 helpers.py
│   │   │       │   ├── 📄 ast.py
│   │   │       │   ├── 📄 cache.py
│   │   │       │   ├── 📄 cmd.py
│   │   │       │   ├── 📄 codegen.py
│   │   │       │   ├── 📄 compat.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 filters.py
│   │   │       │   ├── 📄 lexer.py
│   │   │       │   ├── 📄 lookup.py
│   │   │       │   ├── 📄 parsetree.py
│   │   │       │   ├── 📄 pygen.py
│   │   │       │   ├── 📄 pyparser.py
│   │   │       │   ├── 📄 runtime.py
│   │   │       │   ├── 📄 template.py
│   │   │       │   └── 📄 util.py
│   │   │       ├── 📁 mako-1.3.10.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 markupsafe/
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 markupsafe-3.0.3.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 multipart/
│   │   │       │   ├── 📄 decoders.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   └── 📄 multipart.py
│   │   │       ├── 📁 oauthlib/
│   │   │       │   ├── 📁 oauth1/
│   │   │       │   │   ├── 📁 rfc5849/
│   │   │       │   │   │   ├── 📁 endpoints/
│   │   │       │   │   │   │   ├── 📄 access_token.py
│   │   │       │   │   │   │   ├── 📄 authorization.py
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   ├── 📄 pre_configured.py
│   │   │       │   │   │   │   ├── 📄 request_token.py
│   │   │       │   │   │   │   ├── 📄 resource.py
│   │   │       │   │   │   │   └── 📄 signature_only.py
│   │   │       │   │   │   ├── 📄 errors.py
│   │   │       │   │   │   ├── 📄 parameters.py
│   │   │       │   │   │   ├── 📄 request_validator.py
│   │   │       │   │   │   ├── 📄 signature.py
│   │   │       │   │   │   └── 📄 utils.py
│   │   │       │   ├── 📁 oauth2/
│   │   │       │   │   ├── 📁 rfc6749/
│   │   │       │   │   │   ├── 📁 clients/
│   │   │       │   │   │   │   ├── 📄 backend_application.py
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   ├── 📄 legacy_application.py
│   │   │       │   │   │   │   ├── 📄 mobile_application.py
│   │   │       │   │   │   │   ├── 📄 service_application.py
│   │   │       │   │   │   │   └── 📄 web_application.py
│   │   │       │   │   │   ├── 📁 endpoints/
│   │   │       │   │   │   │   ├── 📄 authorization.py
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   ├── 📄 introspect.py
│   │   │       │   │   │   │   ├── 📄 metadata.py
│   │   │       │   │   │   │   ├── 📄 pre_configured.py
│   │   │       │   │   │   │   ├── 📄 resource.py
│   │   │       │   │   │   │   ├── 📄 revocation.py
│   │   │       │   │   │   │   └── 📄 token.py
│   │   │       │   │   │   ├── 📁 grant_types/
│   │   │       │   │   │   │   ├── 📄 authorization_code.py
│   │   │       │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   ├── 📄 client_credentials.py
│   │   │       │   │   │   │   ├── 📄 implicit.py
│   │   │       │   │   │   │   ├── 📄 refresh_token.py
│   │   │       │   │   │   │   └── 📄 resource_owner_password_credentials.py
│   │   │       │   │   │   ├── 📄 errors.py
│   │   │       │   │   │   ├── 📄 parameters.py
│   │   │       │   │   │   ├── 📄 request_validator.py
│   │   │       │   │   │   ├── 📄 tokens.py
│   │   │       │   │   │   └── 📄 utils.py
│   │   │       │   │   ├── 📁 rfc8628/
│   │   │       │   │   │   ├── 📁 clients/
│   │   │       │   │   │   │   └── 📄 device.py
│   │   │       │   │   │   ├── 📁 endpoints/
│   │   │       │   │   │   │   ├── 📄 device_authorization.py
│   │   │       │   │   │   │   └── 📄 pre_configured.py
│   │   │       │   │   │   ├── 📁 grant_types/
│   │   │       │   │   │   │   └── 📄 device_code.py
│   │   │       │   │   │   ├── 📄 errors.py
│   │   │       │   │   │   └── 📄 request_validator.py
│   │   │       │   ├── 📁 openid/
│   │   │       │   │   ├── 📁 connect/
│   │   │       │   │   │   ├── 📁 core/
│   │   │       │   │   │   │   ├── 📁 endpoints/
│   │   │       │   │   │   │   │   ├── 📄 pre_configured.py
│   │   │       │   │   │   │   │   └── 📄 userinfo.py
│   │   │       │   │   │   │   ├── 📁 grant_types/
│   │   │       │   │   │   │   │   ├── 📄 authorization_code.py
│   │   │       │   │   │   │   │   ├── 📄 base.py
│   │   │       │   │   │   │   │   ├── 📄 dispatchers.py
│   │   │       │   │   │   │   │   ├── 📄 hybrid.py
│   │   │       │   │   │   │   │   ├── 📄 implicit.py
│   │   │       │   │   │   │   │   └── 📄 refresh_token.py
│   │   │       │   │   │   │   ├── 📄 exceptions.py
│   │   │       │   │   │   │   ├── 📄 request_validator.py
│   │   │       │   │   │   │   └── 📄 tokens.py
│   │   │       │   ├── 📄 common.py
│   │   │       │   ├── 📄 signals.py
│   │   │       │   └── 📄 uri_validate.py
│   │   │       ├── 📁 oauthlib-3.3.1.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 PIL/
│   │   │       │   ├── 📄 AvifImagePlugin.py
│   │   │       │   ├── 📄 BdfFontFile.py
│   │   │       │   ├── 📄 BlpImagePlugin.py
│   │   │       │   ├── 📄 BmpImagePlugin.py
│   │   │       │   ├── 📄 BufrStubImagePlugin.py
│   │   │       │   ├── 📄 ContainerIO.py
│   │   │       │   ├── 📄 CurImagePlugin.py
│   │   │       │   ├── 📄 DcxImagePlugin.py
│   │   │       │   ├── 📄 DdsImagePlugin.py
│   │   │       │   ├── 📄 EpsImagePlugin.py
│   │   │       │   ├── 📄 ExifTags.py
│   │   │       │   ├── 📄 features.py
│   │   │       │   ├── 📄 FitsImagePlugin.py
│   │   │       │   ├── 📄 FliImagePlugin.py
│   │   │       │   ├── 📄 FontFile.py
│   │   │       │   ├── 📄 FpxImagePlugin.py
│   │   │       │   ├── 📄 FtexImagePlugin.py
│   │   │       │   ├── 📄 GbrImagePlugin.py
│   │   │       │   ├── 📄 GdImageFile.py
│   │   │       │   ├── 📄 GifImagePlugin.py
│   │   │       │   ├── 📄 GimpGradientFile.py
│   │   │       │   ├── 📄 GimpPaletteFile.py
│   │   │       │   ├── 📄 GribStubImagePlugin.py
│   │   │       │   ├── 📄 Hdf5StubImagePlugin.py
│   │   │       │   ├── 📄 IcnsImagePlugin.py
│   │   │       │   ├── 📄 IcoImagePlugin.py
│   │   │       │   ├── 📄 Image.py
│   │   │       │   ├── 📄 ImageChops.py
│   │   │       │   ├── 📄 ImageCms.py
│   │   │       │   ├── 📄 ImageColor.py
│   │   │       │   ├── 📄 ImageDraw.py
│   │   │       │   ├── 📄 ImageDraw2.py
│   │   │       │   ├── 📄 ImageEnhance.py
│   │   │       │   ├── 📄 ImageFile.py
│   │   │       │   ├── 📄 ImageFilter.py
│   │   │       │   ├── 📄 ImageFont.py
│   │   │       │   ├── 📄 ImageGrab.py
│   │   │       │   ├── 📄 ImageMath.py
│   │   │       │   ├── 📄 ImageMode.py
│   │   │       │   ├── 📄 ImageMorph.py
│   │   │       │   ├── 📄 ImageOps.py
│   │   │       │   ├── 📄 ImagePalette.py
│   │   │       │   ├── 📄 ImagePath.py
│   │   │       │   ├── 📄 ImageQt.py
│   │   │       │   ├── 📄 ImageSequence.py
│   │   │       │   ├── 📄 ImageShow.py
│   │   │       │   ├── 📄 ImageStat.py
│   │   │       │   ├── 📄 ImageText.py
│   │   │       │   ├── 📄 ImageTk.py
│   │   │       │   ├── 📄 ImageTransform.py
│   │   │       │   ├── 📄 ImageWin.py
│   │   │       │   ├── 📄 ImImagePlugin.py
│   │   │       │   ├── 📄 ImtImagePlugin.py
│   │   │       │   ├── 📄 IptcImagePlugin.py
│   │   │       │   ├── 📄 Jpeg2KImagePlugin.py
│   │   │       │   ├── 📄 JpegImagePlugin.py
│   │   │       │   ├── 📄 JpegPresets.py
│   │   │       │   ├── 📄 McIdasImagePlugin.py
│   │   │       │   ├── 📄 MicImagePlugin.py
│   │   │       │   ├── 📄 MpegImagePlugin.py
│   │   │       │   ├── 📄 MpoImagePlugin.py
│   │   │       │   ├── 📄 MspImagePlugin.py
│   │   │       │   ├── 📄 PaletteFile.py
│   │   │       │   ├── 📄 PalmImagePlugin.py
│   │   │       │   ├── 📄 PcdImagePlugin.py
│   │   │       │   ├── 📄 PcfFontFile.py
│   │   │       │   ├── 📄 PcxImagePlugin.py
│   │   │       │   ├── 📄 PdfImagePlugin.py
│   │   │       │   ├── 📄 PdfParser.py
│   │   │       │   ├── 📄 PixarImagePlugin.py
│   │   │       │   ├── 📄 PngImagePlugin.py
│   │   │       │   ├── 📄 PpmImagePlugin.py
│   │   │       │   ├── 📄 PsdImagePlugin.py
│   │   │       │   ├── 📄 PSDraw.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 QoiImagePlugin.py
│   │   │       │   ├── 📄 report.py
│   │   │       │   ├── 📄 SgiImagePlugin.py
│   │   │       │   ├── 📄 SpiderImagePlugin.py
│   │   │       │   ├── 📄 SunImagePlugin.py
│   │   │       │   ├── 📄 TarIO.py
│   │   │       │   ├── 📄 TgaImagePlugin.py
│   │   │       │   ├── 📄 TiffImagePlugin.py
│   │   │       │   ├── 📄 TiffTags.py
│   │   │       │   ├── 📄 WalImageFile.py
│   │   │       │   ├── 📄 WebPImagePlugin.py
│   │   │       │   ├── 📄 WmfImagePlugin.py
│   │   │       │   ├── 📄 XbmImagePlugin.py
│   │   │       │   ├── 📄 XpmImagePlugin.py
│   │   │       │   └── 📄 XVThumbImagePlugin.py
│   │   │       ├── 📁 pillow-12.0.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   ├── 📄 WHEEL
│   │   │       │   └── 📄 zip-safe
│   │   │       ├── 📁 pip/
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 pip-25.2.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   ├── 📁 src/
│   │   │       │   │   │   └── 📁 pip/
│   │   │       │   │   ├── 📄 AUTHORS.txt
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 proto/
│   │   │       │   ├── 📁 marshal/
│   │   │       │   │   ├── 📁 collections/
│   │   │       │   │   │   ├── 📄 maps.py
│   │   │       │   │   │   └── 📄 repeated.py
│   │   │       │   │   ├── 📁 rules/
│   │   │       │   │   │   ├── 📄 bytes.py
│   │   │       │   │   │   ├── 📄 dates.py
│   │   │       │   │   │   ├── 📄 enums.py
│   │   │       │   │   │   ├── 📄 field_mask.py
│   │   │       │   │   │   ├── 📄 message.py
│   │   │       │   │   │   ├── 📄 stringy_numbers.py
│   │   │       │   │   │   ├── 📄 struct.py
│   │   │       │   │   │   └── 📄 wrappers.py
│   │   │       │   │   ├── 📄 compat.py
│   │   │       │   │   └── 📄 marshal.py
│   │   │       │   ├── 📄 datetime_helpers.py
│   │   │       │   ├── 📄 enums.py
│   │   │       │   ├── 📄 fields.py
│   │   │       │   ├── 📄 message.py
│   │   │       │   ├── 📄 modules.py
│   │   │       │   ├── 📄 primitives.py
│   │   │       │   ├── 📄 utils.py
│   │   │       │   └── 📄 version.py
│   │   │       ├── 📁 proto_plus-1.26.1.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 protobuf-6.33.0.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 psycopg2/
│   │   │       │   ├── 📄 errorcodes.py
│   │   │       │   ├── 📄 errors.py
│   │   │       │   ├── 📄 extensions.py
│   │   │       │   ├── 📄 extras.py
│   │   │       │   ├── 📄 pool.py
│   │   │       │   ├── 📄 sql.py
│   │   │       │   └── 📄 tz.py
│   │   │       ├── 📁 psycopg2_binary-2.9.11.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 DELVEWHEEL
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 psycopg2_binary.libs/
│   │   │       │   ├── 📄 libcrypto-3-x64-5c171716accecee9b0c1ee574c2a4da0.dll
│   │   │       │   ├── 📄 libpq-2d95d8c8be26654a630220107eb268e7.dll
│   │   │       │   └── 📄 libssl-3-x64-dd4221de8bb64df4e207d54ae2f1061b.dll
│   │   │       ├── 📁 pyasn1/
│   │   │       │   ├── 📁 codec/
│   │   │       │   │   ├── 📁 ber/
│   │   │       │   │   │   ├── 📄 decoder.py
│   │   │       │   │   │   ├── 📄 encoder.py
│   │   │       │   │   │   └── 📄 eoo.py
│   │   │       │   │   ├── 📁 cer/
│   │   │       │   │   │   ├── 📄 decoder.py
│   │   │       │   │   │   └── 📄 encoder.py
│   │   │       │   │   ├── 📁 der/
│   │   │       │   │   │   ├── 📄 decoder.py
│   │   │       │   │   │   └── 📄 encoder.py
│   │   │       │   │   ├── 📁 native/
│   │   │       │   │   │   ├── 📄 decoder.py
│   │   │       │   │   │   └── 📄 encoder.py
│   │   │       │   │   └── 📄 streaming.py
│   │   │       │   ├── 📁 compat/
│   │   │       │   │   └── 📄 integer.py
│   │   │       │   ├── 📁 type/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 char.py
│   │   │       │   │   ├── 📄 constraint.py
│   │   │       │   │   ├── 📄 error.py
│   │   │       │   │   ├── 📄 namedtype.py
│   │   │       │   │   ├── 📄 namedval.py
│   │   │       │   │   ├── 📄 opentype.py
│   │   │       │   │   ├── 📄 tag.py
│   │   │       │   │   ├── 📄 tagmap.py
│   │   │       │   │   ├── 📄 univ.py
│   │   │       │   │   └── 📄 useful.py
│   │   │       │   ├── 📄 debug.py
│   │   │       │   └── 📄 error.py
│   │   │       ├── 📁 pyasn1_modules/
│   │   │       │   ├── 📄 pem.py
│   │   │       │   ├── 📄 rfc1155.py
│   │   │       │   ├── 📄 rfc1157.py
│   │   │       │   ├── 📄 rfc1901.py
│   │   │       │   ├── 📄 rfc1902.py
│   │   │       │   ├── 📄 rfc1905.py
│   │   │       │   ├── 📄 rfc2251.py
│   │   │       │   ├── 📄 rfc2314.py
│   │   │       │   ├── 📄 rfc2315.py
│   │   │       │   ├── 📄 rfc2437.py
│   │   │       │   ├── 📄 rfc2459.py
│   │   │       │   ├── 📄 rfc2511.py
│   │   │       │   ├── 📄 rfc2560.py
│   │   │       │   ├── 📄 rfc2631.py
│   │   │       │   ├── 📄 rfc2634.py
│   │   │       │   ├── 📄 rfc2876.py
│   │   │       │   ├── 📄 rfc2985.py
│   │   │       │   ├── 📄 rfc2986.py
│   │   │       │   ├── 📄 rfc3058.py
│   │   │       │   ├── 📄 rfc3114.py
│   │   │       │   ├── 📄 rfc3125.py
│   │   │       │   ├── 📄 rfc3161.py
│   │   │       │   ├── 📄 rfc3274.py
│   │   │       │   ├── 📄 rfc3279.py
│   │   │       │   ├── 📄 rfc3280.py
│   │   │       │   ├── 📄 rfc3281.py
│   │   │       │   ├── 📄 rfc3370.py
│   │   │       │   ├── 📄 rfc3412.py
│   │   │       │   ├── 📄 rfc3414.py
│   │   │       │   ├── 📄 rfc3447.py
│   │   │       │   ├── 📄 rfc3537.py
│   │   │       │   ├── 📄 rfc3560.py
│   │   │       │   ├── 📄 rfc3565.py
│   │   │       │   ├── 📄 rfc3657.py
│   │   │       │   ├── 📄 rfc3709.py
│   │   │       │   ├── 📄 rfc3739.py
│   │   │       │   ├── 📄 rfc3770.py
│   │   │       │   ├── 📄 rfc3779.py
│   │   │       │   ├── 📄 rfc3820.py
│   │   │       │   ├── 📄 rfc3852.py
│   │   │       │   ├── 📄 rfc4010.py
│   │   │       │   ├── 📄 rfc4043.py
│   │   │       │   ├── 📄 rfc4055.py
│   │   │       │   ├── 📄 rfc4073.py
│   │   │       │   ├── 📄 rfc4108.py
│   │   │       │   ├── 📄 rfc4210.py
│   │   │       │   ├── 📄 rfc4211.py
│   │   │       │   ├── 📄 rfc4334.py
│   │   │       │   ├── 📄 rfc4357.py
│   │   │       │   ├── 📄 rfc4387.py
│   │   │       │   ├── 📄 rfc4476.py
│   │   │       │   ├── 📄 rfc4490.py
│   │   │       │   ├── 📄 rfc4491.py
│   │   │       │   ├── 📄 rfc4683.py
│   │   │       │   ├── 📄 rfc4985.py
│   │   │       │   ├── 📄 rfc5035.py
│   │   │       │   ├── 📄 rfc5083.py
│   │   │       │   ├── 📄 rfc5084.py
│   │   │       │   ├── 📄 rfc5126.py
│   │   │       │   ├── 📄 rfc5208.py
│   │   │       │   ├── 📄 rfc5275.py
│   │   │       │   ├── 📄 rfc5280.py
│   │   │       │   ├── 📄 rfc5480.py
│   │   │       │   ├── 📄 rfc5636.py
│   │   │       │   ├── 📄 rfc5639.py
│   │   │       │   ├── 📄 rfc5649.py
│   │   │       │   ├── 📄 rfc5652.py
│   │   │       │   ├── 📄 rfc5697.py
│   │   │       │   ├── 📄 rfc5751.py
│   │   │       │   ├── 📄 rfc5752.py
│   │   │       │   ├── 📄 rfc5753.py
│   │   │       │   ├── 📄 rfc5755.py
│   │   │       │   ├── 📄 rfc5913.py
│   │   │       │   ├── 📄 rfc5914.py
│   │   │       │   ├── 📄 rfc5915.py
│   │   │       │   ├── 📄 rfc5916.py
│   │   │       │   ├── 📄 rfc5917.py
│   │   │       │   ├── 📄 rfc5924.py
│   │   │       │   ├── 📄 rfc5934.py
│   │   │       │   ├── 📄 rfc5940.py
│   │   │       │   ├── 📄 rfc5958.py
│   │   │       │   ├── 📄 rfc5990.py
│   │   │       │   ├── 📄 rfc6010.py
│   │   │       │   ├── 📄 rfc6019.py
│   │   │       │   ├── 📄 rfc6031.py
│   │   │       │   ├── 📄 rfc6032.py
│   │   │       │   ├── 📄 rfc6120.py
│   │   │       │   ├── 📄 rfc6170.py
│   │   │       │   ├── 📄 rfc6187.py
│   │   │       │   ├── 📄 rfc6210.py
│   │   │       │   ├── 📄 rfc6211.py
│   │   │       │   ├── 📄 rfc6402.py
│   │   │       │   ├── 📄 rfc6482.py
│   │   │       │   ├── 📄 rfc6486.py
│   │   │       │   ├── 📄 rfc6487.py
│   │   │       │   ├── 📄 rfc6664.py
│   │   │       │   ├── 📄 rfc6955.py
│   │   │       │   ├── 📄 rfc6960.py
│   │   │       │   ├── 📄 rfc7030.py
│   │   │       │   ├── 📄 rfc7191.py
│   │   │       │   ├── 📄 rfc7229.py
│   │   │       │   ├── 📄 rfc7292.py
│   │   │       │   ├── 📄 rfc7296.py
│   │   │       │   ├── 📄 rfc7508.py
│   │   │       │   ├── 📄 rfc7585.py
│   │   │       │   ├── 📄 rfc7633.py
│   │   │       │   ├── 📄 rfc7773.py
│   │   │       │   ├── 📄 rfc7894.py
│   │   │       │   ├── 📄 rfc7906.py
│   │   │       │   ├── 📄 rfc7914.py
│   │   │       │   ├── 📄 rfc8017.py
│   │   │       │   ├── 📄 rfc8018.py
│   │   │       │   ├── 📄 rfc8103.py
│   │   │       │   ├── 📄 rfc8209.py
│   │   │       │   ├── 📄 rfc8226.py
│   │   │       │   ├── 📄 rfc8358.py
│   │   │       │   ├── 📄 rfc8360.py
│   │   │       │   ├── 📄 rfc8398.py
│   │   │       │   ├── 📄 rfc8410.py
│   │   │       │   ├── 📄 rfc8418.py
│   │   │       │   ├── 📄 rfc8419.py
│   │   │       │   ├── 📄 rfc8479.py
│   │   │       │   ├── 📄 rfc8494.py
│   │   │       │   ├── 📄 rfc8520.py
│   │   │       │   ├── 📄 rfc8619.py
│   │   │       │   ├── 📄 rfc8649.py
│   │   │       │   ├── 📄 rfc8692.py
│   │   │       │   ├── 📄 rfc8696.py
│   │   │       │   ├── 📄 rfc8702.py
│   │   │       │   ├── 📄 rfc8708.py
│   │   │       │   └── 📄 rfc8769.py
│   │   │       ├── 📁 pyasn1_modules-0.4.2.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   ├── 📄 WHEEL
│   │   │       │   └── 📄 zip-safe
│   │   │       ├── 📁 pyasn1-0.6.1.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE.rst
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   ├── 📄 WHEEL
│   │   │       │   └── 📄 zip-safe
│   │   │       ├── 📁 pycparser/
│   │   │       │   ├── 📁 ply/
│   │   │       │   │   ├── 📄 cpp.py
│   │   │       │   │   ├── 📄 ctokens.py
│   │   │       │   │   ├── 📄 lex.py
│   │   │       │   │   ├── 📄 yacc.py
│   │   │       │   │   └── 📄 ygen.py
│   │   │       │   ├── 📄 ast_transforms.py
│   │   │       │   ├── 📄 c_ast.py
│   │   │       │   ├── 📄 c_generator.py
│   │   │       │   ├── 📄 c_lexer.py
│   │   │       │   ├── 📄 c_parser.py
│   │   │       │   ├── 📄 lextab.py
│   │   │       │   ├── 📄 plyparser.py
│   │   │       │   └── 📄 yacctab.py
│   │   │       ├── 📁 pycparser-2.23.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 pydantic/
│   │   │       │   ├── 📁 deprecated/
│   │   │       │   │   ├── 📄 class_validators.py
│   │   │       │   │   ├── 📄 config.py
│   │   │       │   │   ├── 📄 copy_internals.py
│   │   │       │   │   ├── 📄 decorator.py
│   │   │       │   │   ├── 📄 json.py
│   │   │       │   │   ├── 📄 parse.py
│   │   │       │   │   └── 📄 tools.py
│   │   │       │   ├── 📁 experimental/
│   │   │       │   │   ├── 📄 arguments_schema.py
│   │   │       │   │   ├── 📄 missing_sentinel.py
│   │   │       │   │   └── 📄 pipeline.py
│   │   │       │   ├── 📁 plugin/
│   │   │       │   ├── 📁 v1/
│   │   │       │   │   ├── 📄 annotated_types.py
│   │   │       │   │   ├── 📄 class_validators.py
│   │   │       │   │   ├── 📄 color.py
│   │   │       │   │   ├── 📄 config.py
│   │   │       │   │   ├── 📄 dataclasses.py
│   │   │       │   │   ├── 📄 datetime_parse.py
│   │   │       │   │   ├── 📄 decorator.py
│   │   │       │   │   ├── 📄 env_settings.py
│   │   │       │   │   ├── 📄 error_wrappers.py
│   │   │       │   │   ├── 📄 errors.py
│   │   │       │   │   ├── 📄 fields.py
│   │   │       │   │   ├── 📄 generics.py
│   │   │       │   │   ├── 📄 json.py
│   │   │       │   │   ├── 📄 main.py
│   │   │       │   │   ├── 📄 mypy.py
│   │   │       │   │   ├── 📄 networks.py
│   │   │       │   │   ├── 📄 parse.py
│   │   │       │   │   ├── 📄 py.typed
│   │   │       │   │   ├── 📄 schema.py
│   │   │       │   │   ├── 📄 tools.py
│   │   │       │   │   ├── 📄 types.py
│   │   │       │   │   ├── 📄 typing.py
│   │   │       │   │   ├── 📄 utils.py
│   │   │       │   │   ├── 📄 validators.py
│   │   │       │   │   └── 📄 version.py
│   │   │       │   ├── 📄 alias_generators.py
│   │   │       │   ├── 📄 aliases.py
│   │   │       │   ├── 📄 annotated_handlers.py
│   │   │       │   ├── 📄 class_validators.py
│   │   │       │   ├── 📄 color.py
│   │   │       │   ├── 📄 config.py
│   │   │       │   ├── 📄 dataclasses.py
│   │   │       │   ├── 📄 datetime_parse.py
│   │   │       │   ├── 📄 decorator.py
│   │   │       │   ├── 📄 env_settings.py
│   │   │       │   ├── 📄 error_wrappers.py
│   │   │       │   ├── 📄 errors.py
│   │   │       │   ├── 📄 fields.py
│   │   │       │   ├── 📄 functional_serializers.py
│   │   │       │   ├── 📄 functional_validators.py
│   │   │       │   ├── 📄 generics.py
│   │   │       │   ├── 📄 json_schema.py
│   │   │       │   ├── 📄 json.py
│   │   │       │   ├── 📄 main.py
│   │   │       │   ├── 📄 mypy.py
│   │   │       │   ├── 📄 networks.py
│   │   │       │   ├── 📄 parse.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 root_model.py
│   │   │       │   ├── 📄 schema.py
│   │   │       │   ├── 📄 tools.py
│   │   │       │   ├── 📄 type_adapter.py
│   │   │       │   ├── 📄 types.py
│   │   │       │   ├── 📄 typing.py
│   │   │       │   ├── 📄 utils.py
│   │   │       │   ├── 📄 validate_call_decorator.py
│   │   │       │   ├── 📄 validators.py
│   │   │       │   ├── 📄 version.py
│   │   │       │   └── 📄 warnings.py
│   │   │       ├── 📁 pydantic_core/
│   │   │       │   ├── 📄 core_schema.py
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 pydantic_core-2.41.4.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 pydantic_settings/
│   │   │       │   ├── 📁 sources/
│   │   │       │   │   ├── 📁 providers/
│   │   │       │   │   │   ├── 📄 aws.py
│   │   │       │   │   │   ├── 📄 azure.py
│   │   │       │   │   │   ├── 📄 cli.py
│   │   │       │   │   │   ├── 📄 dotenv.py
│   │   │       │   │   │   ├── 📄 env.py
│   │   │       │   │   │   ├── 📄 gcp.py
│   │   │       │   │   │   ├── 📄 json.py
│   │   │       │   │   │   ├── 📄 pyproject.py
│   │   │       │   │   │   ├── 📄 secrets.py
│   │   │       │   │   │   ├── 📄 toml.py
│   │   │       │   │   │   └── 📄 yaml.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 types.py
│   │   │       │   │   └── 📄 utils.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 main.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 utils.py
│   │   │       │   └── 📄 version.py
│   │   │       ├── 📁 pydantic_settings-2.11.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 pydantic-2.12.3.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 pyparsing/
│   │   │       │   ├── 📁 diagram/
│   │   │       │   ├── 📁 tools/
│   │   │       │   │   └── 📄 cvt_pyparsing_pep8_names.py
│   │   │       │   ├── 📄 actions.py
│   │   │       │   ├── 📄 common.py
│   │   │       │   ├── 📄 core.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 helpers.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 results.py
│   │   │       │   ├── 📄 testing.py
│   │   │       │   ├── 📄 unicode.py
│   │   │       │   └── 📄 util.py
│   │   │       ├── 📁 pyparsing-3.2.5.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 python_dotenv-1.1.1.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 python_jose-3.5.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 python_multipart/
│   │   │       │   ├── 📄 decoders.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 multipart.py
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 python_multipart-0.0.20.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 requests/
│   │   │       │   ├── 📄 adapters.py
│   │   │       │   ├── 📄 api.py
│   │   │       │   ├── 📄 auth.py
│   │   │       │   ├── 📄 certs.py
│   │   │       │   ├── 📄 compat.py
│   │   │       │   ├── 📄 cookies.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 help.py
│   │   │       │   ├── 📄 hooks.py
│   │   │       │   ├── 📄 models.py
│   │   │       │   ├── 📄 packages.py
│   │   │       │   ├── 📄 sessions.py
│   │   │       │   ├── 📄 status_codes.py
│   │   │       │   ├── 📄 structures.py
│   │   │       │   └── 📄 utils.py
│   │   │       ├── 📁 requests_oauthlib/
│   │   │       │   ├── 📁 compliance_fixes/
│   │   │       │   │   ├── 📄 douban.py
│   │   │       │   │   ├── 📄 ebay.py
│   │   │       │   │   ├── 📄 facebook.py
│   │   │       │   │   ├── 📄 fitbit.py
│   │   │       │   │   ├── 📄 instagram.py
│   │   │       │   │   ├── 📄 mailchimp.py
│   │   │       │   │   ├── 📄 plentymarkets.py
│   │   │       │   │   ├── 📄 slack.py
│   │   │       │   │   └── 📄 weibo.py
│   │   │       │   ├── 📄 oauth1_auth.py
│   │   │       │   ├── 📄 oauth1_session.py
│   │   │       │   ├── 📄 oauth2_auth.py
│   │   │       │   └── 📄 oauth2_session.py
│   │   │       ├── 📁 requests_oauthlib-2.0.0.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 requests-2.32.5.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 rsa/
│   │   │       │   ├── 📄 asn1.py
│   │   │       │   ├── 📄 cli.py
│   │   │       │   ├── 📄 common.py
│   │   │       │   ├── 📄 core.py
│   │   │       │   ├── 📄 key.py
│   │   │       │   ├── 📄 parallel.py
│   │   │       │   ├── 📄 pem.py
│   │   │       │   ├── 📄 pkcs1_v2.py
│   │   │       │   ├── 📄 pkcs1.py
│   │   │       │   ├── 📄 prime.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 randnum.py
│   │   │       │   ├── 📄 transform.py
│   │   │       │   └── 📄 util.py
│   │   │       ├── 📁 rsa-4.9.1.dist-info/
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 six-1.17.0.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 sniffio/
│   │   │       │   └── 📄 py.typed
│   │   │       ├── 📁 sniffio-1.3.1.dist-info/
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 LICENSE
│   │   │       │   ├── 📄 LICENSE.APACHE2
│   │   │       │   ├── 📄 LICENSE.MIT
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 sqlalchemy/
│   │   │       │   ├── 📁 connectors/
│   │   │       │   │   ├── 📄 aioodbc.py
│   │   │       │   │   ├── 📄 asyncio.py
│   │   │       │   │   └── 📄 pyodbc.py
│   │   │       │   ├── 📁 cyextension/
│   │   │       │   │   ├── 📄 collections.cp313-win_amd64.pyd
│   │   │       │   │   ├── 📄 collections.pyx
│   │   │       │   │   ├── 📄 immutabledict.cp313-win_amd64.pyd
│   │   │       │   │   ├── 📄 immutabledict.pxd
│   │   │       │   │   ├── 📄 immutabledict.pyx
│   │   │       │   │   ├── 📄 processors.cp313-win_amd64.pyd
│   │   │       │   │   ├── 📄 processors.pyx
│   │   │       │   │   ├── 📄 resultproxy.cp313-win_amd64.pyd
│   │   │       │   │   ├── 📄 resultproxy.pyx
│   │   │       │   │   ├── 📄 util.cp313-win_amd64.pyd
│   │   │       │   │   └── 📄 util.pyx
│   │   │       │   ├── 📁 dialects/
│   │   │       │   │   ├── 📁 mssql/
│   │   │       │   │   │   ├── 📄 aioodbc.py
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 information_schema.py
│   │   │       │   │   │   ├── 📄 json.py
│   │   │       │   │   │   ├── 📄 provision.py
│   │   │       │   │   │   ├── 📄 pymssql.py
│   │   │       │   │   │   └── 📄 pyodbc.py
│   │   │       │   │   ├── 📁 mysql/
│   │   │       │   │   │   ├── 📄 aiomysql.py
│   │   │       │   │   │   ├── 📄 asyncmy.py
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 cymysql.py
│   │   │       │   │   │   ├── 📄 dml.py
│   │   │       │   │   │   ├── 📄 enumerated.py
│   │   │       │   │   │   ├── 📄 expression.py
│   │   │       │   │   │   ├── 📄 json.py
│   │   │       │   │   │   ├── 📄 mariadb.py
│   │   │       │   │   │   ├── 📄 mariadbconnector.py
│   │   │       │   │   │   ├── 📄 mysqlconnector.py
│   │   │       │   │   │   ├── 📄 mysqldb.py
│   │   │       │   │   │   ├── 📄 provision.py
│   │   │       │   │   │   ├── 📄 pymysql.py
│   │   │       │   │   │   ├── 📄 pyodbc.py
│   │   │       │   │   │   ├── 📄 reflection.py
│   │   │       │   │   │   ├── 📄 reserved_words.py
│   │   │       │   │   │   └── 📄 types.py
│   │   │       │   │   ├── 📁 oracle/
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 cx_oracle.py
│   │   │       │   │   │   ├── 📄 dictionary.py
│   │   │       │   │   │   ├── 📄 oracledb.py
│   │   │       │   │   │   ├── 📄 provision.py
│   │   │       │   │   │   ├── 📄 types.py
│   │   │       │   │   │   └── 📄 vector.py
│   │   │       │   │   ├── 📁 postgresql/
│   │   │       │   │   │   ├── 📄 array.py
│   │   │       │   │   │   ├── 📄 asyncpg.py
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 dml.py
│   │   │       │   │   │   ├── 📄 ext.py
│   │   │       │   │   │   ├── 📄 hstore.py
│   │   │       │   │   │   ├── 📄 json.py
│   │   │       │   │   │   ├── 📄 named_types.py
│   │   │       │   │   │   ├── 📄 operators.py
│   │   │       │   │   │   ├── 📄 pg_catalog.py
│   │   │       │   │   │   ├── 📄 pg8000.py
│   │   │       │   │   │   ├── 📄 provision.py
│   │   │       │   │   │   ├── 📄 psycopg.py
│   │   │       │   │   │   ├── 📄 psycopg2.py
│   │   │       │   │   │   ├── 📄 psycopg2cffi.py
│   │   │       │   │   │   ├── 📄 ranges.py
│   │   │       │   │   │   └── 📄 types.py
│   │   │       │   │   ├── 📁 sqlite/
│   │   │       │   │   │   ├── 📄 aiosqlite.py
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 dml.py
│   │   │       │   │   │   ├── 📄 json.py
│   │   │       │   │   │   ├── 📄 provision.py
│   │   │       │   │   │   ├── 📄 pysqlcipher.py
│   │   │       │   │   │   └── 📄 pysqlite.py
│   │   │       │   │   └── 📄 type_migration_guidelines.txt
│   │   │       │   ├── 📁 engine/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 characteristics.py
│   │   │       │   │   ├── 📄 create.py
│   │   │       │   │   ├── 📄 cursor.py
│   │   │       │   │   ├── 📄 default.py
│   │   │       │   │   ├── 📄 events.py
│   │   │       │   │   ├── 📄 interfaces.py
│   │   │       │   │   ├── 📄 mock.py
│   │   │       │   │   ├── 📄 processors.py
│   │   │       │   │   ├── 📄 reflection.py
│   │   │       │   │   ├── 📄 result.py
│   │   │       │   │   ├── 📄 row.py
│   │   │       │   │   ├── 📄 strategies.py
│   │   │       │   │   ├── 📄 url.py
│   │   │       │   │   └── 📄 util.py
│   │   │       │   ├── 📁 event/
│   │   │       │   │   ├── 📄 api.py
│   │   │       │   │   ├── 📄 attr.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 legacy.py
│   │   │       │   │   └── 📄 registry.py
│   │   │       │   ├── 📁 ext/
│   │   │       │   │   ├── 📁 asyncio/
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 engine.py
│   │   │       │   │   │   ├── 📄 exc.py
│   │   │       │   │   │   ├── 📄 result.py
│   │   │       │   │   │   ├── 📄 scoping.py
│   │   │       │   │   │   └── 📄 session.py
│   │   │       │   │   ├── 📁 declarative/
│   │   │       │   │   │   └── 📄 extensions.py
│   │   │       │   │   ├── 📁 mypy/
│   │   │       │   │   │   ├── 📄 apply.py
│   │   │       │   │   │   ├── 📄 decl_class.py
│   │   │       │   │   │   ├── 📄 infer.py
│   │   │       │   │   │   ├── 📄 names.py
│   │   │       │   │   │   ├── 📄 plugin.py
│   │   │       │   │   │   └── 📄 util.py
│   │   │       │   │   ├── 📄 associationproxy.py
│   │   │       │   │   ├── 📄 automap.py
│   │   │       │   │   ├── 📄 baked.py
│   │   │       │   │   ├── 📄 compiler.py
│   │   │       │   │   ├── 📄 horizontal_shard.py
│   │   │       │   │   ├── 📄 hybrid.py
│   │   │       │   │   ├── 📄 indexable.py
│   │   │       │   │   ├── 📄 instrumentation.py
│   │   │       │   │   ├── 📄 mutable.py
│   │   │       │   │   ├── 📄 orderinglist.py
│   │   │       │   │   └── 📄 serializer.py
│   │   │       │   ├── 📁 future/
│   │   │       │   │   └── 📄 engine.py
│   │   │       │   ├── 📁 orm/
│   │   │       │   │   ├── 📄 attributes.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 bulk_persistence.py
│   │   │       │   │   ├── 📄 clsregistry.py
│   │   │       │   │   ├── 📄 collections.py
│   │   │       │   │   ├── 📄 context.py
│   │   │       │   │   ├── 📄 decl_api.py
│   │   │       │   │   ├── 📄 decl_base.py
│   │   │       │   │   ├── 📄 dependency.py
│   │   │       │   │   ├── 📄 descriptor_props.py
│   │   │       │   │   ├── 📄 dynamic.py
│   │   │       │   │   ├── 📄 evaluator.py
│   │   │       │   │   ├── 📄 events.py
│   │   │       │   │   ├── 📄 exc.py
│   │   │       │   │   ├── 📄 identity.py
│   │   │       │   │   ├── 📄 instrumentation.py
│   │   │       │   │   ├── 📄 interfaces.py
│   │   │       │   │   ├── 📄 loading.py
│   │   │       │   │   ├── 📄 mapped_collection.py
│   │   │       │   │   ├── 📄 mapper.py
│   │   │       │   │   ├── 📄 path_registry.py
│   │   │       │   │   ├── 📄 persistence.py
│   │   │       │   │   ├── 📄 properties.py
│   │   │       │   │   ├── 📄 query.py
│   │   │       │   │   ├── 📄 relationships.py
│   │   │       │   │   ├── 📄 scoping.py
│   │   │       │   │   ├── 📄 session.py
│   │   │       │   │   ├── 📄 state_changes.py
│   │   │       │   │   ├── 📄 state.py
│   │   │       │   │   ├── 📄 strategies.py
│   │   │       │   │   ├── 📄 strategy_options.py
│   │   │       │   │   ├── 📄 sync.py
│   │   │       │   │   ├── 📄 unitofwork.py
│   │   │       │   │   ├── 📄 util.py
│   │   │       │   │   └── 📄 writeonly.py
│   │   │       │   ├── 📁 pool/
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 events.py
│   │   │       │   │   └── 📄 impl.py
│   │   │       │   ├── 📁 sql/
│   │   │       │   │   ├── 📄 annotation.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 cache_key.py
│   │   │       │   │   ├── 📄 coercions.py
│   │   │       │   │   ├── 📄 compiler.py
│   │   │       │   │   ├── 📄 crud.py
│   │   │       │   │   ├── 📄 ddl.py
│   │   │       │   │   ├── 📄 default_comparator.py
│   │   │       │   │   ├── 📄 dml.py
│   │   │       │   │   ├── 📄 elements.py
│   │   │       │   │   ├── 📄 events.py
│   │   │       │   │   ├── 📄 expression.py
│   │   │       │   │   ├── 📄 functions.py
│   │   │       │   │   ├── 📄 lambdas.py
│   │   │       │   │   ├── 📄 naming.py
│   │   │       │   │   ├── 📄 operators.py
│   │   │       │   │   ├── 📄 roles.py
│   │   │       │   │   ├── 📄 schema.py
│   │   │       │   │   ├── 📄 selectable.py
│   │   │       │   │   ├── 📄 sqltypes.py
│   │   │       │   │   ├── 📄 traversals.py
│   │   │       │   │   ├── 📄 type_api.py
│   │   │       │   │   ├── 📄 util.py
│   │   │       │   │   └── 📄 visitors.py
│   │   │       │   ├── 📁 testing/
│   │   │       │   │   ├── 📁 fixtures/
│   │   │       │   │   │   ├── 📄 base.py
│   │   │       │   │   │   ├── 📄 mypy.py
│   │   │       │   │   │   ├── 📄 orm.py
│   │   │       │   │   │   └── 📄 sql.py
│   │   │       │   │   ├── 📁 plugin/
│   │   │       │   │   │   ├── 📄 bootstrap.py
│   │   │       │   │   │   ├── 📄 plugin_base.py
│   │   │       │   │   │   └── 📄 pytestplugin.py
│   │   │       │   │   ├── 📁 suite/
│   │   │       │   │   │   ├── 📄 test_cte.py
│   │   │       │   │   │   ├── 📄 test_ddl.py
│   │   │       │   │   │   ├── 📄 test_deprecations.py
│   │   │       │   │   │   ├── 📄 test_dialect.py
│   │   │       │   │   │   ├── 📄 test_insert.py
│   │   │       │   │   │   ├── 📄 test_reflection.py
│   │   │       │   │   │   ├── 📄 test_results.py
│   │   │       │   │   │   ├── 📄 test_rowcount.py
│   │   │       │   │   │   ├── 📄 test_select.py
│   │   │       │   │   │   ├── 📄 test_sequence.py
│   │   │       │   │   │   ├── 📄 test_types.py
│   │   │       │   │   │   ├── 📄 test_unicode_ddl.py
│   │   │       │   │   │   └── 📄 test_update_delete.py
│   │   │       │   │   ├── 📄 assertions.py
│   │   │       │   │   ├── 📄 assertsql.py
│   │   │       │   │   ├── 📄 asyncio.py
│   │   │       │   │   ├── 📄 config.py
│   │   │       │   │   ├── 📄 engines.py
│   │   │       │   │   ├── 📄 entities.py
│   │   │       │   │   ├── 📄 exclusions.py
│   │   │       │   │   ├── 📄 pickleable.py
│   │   │       │   │   ├── 📄 profiling.py
│   │   │       │   │   ├── 📄 provision.py
│   │   │       │   │   ├── 📄 requirements.py
│   │   │       │   │   ├── 📄 schema.py
│   │   │       │   │   ├── 📄 util.py
│   │   │       │   │   └── 📄 warnings.py
│   │   │       │   ├── 📁 util/
│   │   │       │   │   ├── 📄 compat.py
│   │   │       │   │   ├── 📄 concurrency.py
│   │   │       │   │   ├── 📄 deprecations.py
│   │   │       │   │   ├── 📄 langhelpers.py
│   │   │       │   │   ├── 📄 preloaded.py
│   │   │       │   │   ├── 📄 queue.py
│   │   │       │   │   ├── 📄 tool_support.py
│   │   │       │   │   ├── 📄 topological.py
│   │   │       │   │   └── 📄 typing.py
│   │   │       │   ├── 📄 events.py
│   │   │       │   ├── 📄 exc.py
│   │   │       │   ├── 📄 inspection.py
│   │   │       │   ├── 📄 log.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 schema.py
│   │   │       │   └── 📄 types.py
│   │   │       ├── 📁 sqlalchemy-2.0.44.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 starlette/
│   │   │       │   ├── 📁 middleware/
│   │   │       │   │   ├── 📄 authentication.py
│   │   │       │   │   ├── 📄 base.py
│   │   │       │   │   ├── 📄 cors.py
│   │   │       │   │   ├── 📄 errors.py
│   │   │       │   │   ├── 📄 exceptions.py
│   │   │       │   │   ├── 📄 gzip.py
│   │   │       │   │   ├── 📄 httpsredirect.py
│   │   │       │   │   ├── 📄 sessions.py
│   │   │       │   │   ├── 📄 trustedhost.py
│   │   │       │   │   └── 📄 wsgi.py
│   │   │       │   ├── 📄 applications.py
│   │   │       │   ├── 📄 authentication.py
│   │   │       │   ├── 📄 background.py
│   │   │       │   ├── 📄 concurrency.py
│   │   │       │   ├── 📄 config.py
│   │   │       │   ├── 📄 convertors.py
│   │   │       │   ├── 📄 datastructures.py
│   │   │       │   ├── 📄 endpoints.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 formparsers.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 requests.py
│   │   │       │   ├── 📄 responses.py
│   │   │       │   ├── 📄 routing.py
│   │   │       │   ├── 📄 schemas.py
│   │   │       │   ├── 📄 staticfiles.py
│   │   │       │   ├── 📄 status.py
│   │   │       │   ├── 📄 templating.py
│   │   │       │   ├── 📄 testclient.py
│   │   │       │   ├── 📄 types.py
│   │   │       │   └── 📄 websockets.py
│   │   │       ├── 📁 starlette-0.48.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📝 LICENSE.md
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 typing_extensions-4.15.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 typing_inspection/
│   │   │       │   ├── 📄 introspection.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 typing_objects.py
│   │   │       │   └── 📄 typing_objects.pyi
│   │   │       ├── 📁 typing_inspection-0.4.2.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 uritemplate/
│   │   │       │   ├── 📄 api.py
│   │   │       │   ├── 📄 orderedset.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 template.py
│   │   │       │   └── 📄 variable.py
│   │   │       ├── 📁 uritemplate-4.2.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 top_level.txt
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 urllib3/
│   │   │       │   ├── 📁 contrib/
│   │   │       │   │   ├── 📁 emscripten/
│   │   │       │   │   │   ├── 📄 connection.py
│   │   │       │   │   │   ├── 🟨 emscripten_fetch_worker.js
│   │   │       │   │   │   ├── 📄 fetch.py
│   │   │       │   │   │   ├── 📄 request.py
│   │   │       │   │   │   └── 📄 response.py
│   │   │       │   │   ├── 📄 pyopenssl.py
│   │   │       │   │   └── 📄 socks.py
│   │   │       │   ├── 📁 http2/
│   │   │       │   │   ├── 📄 connection.py
│   │   │       │   │   └── 📄 probe.py
│   │   │       │   ├── 📁 util/
│   │   │       │   │   ├── 📄 connection.py
│   │   │       │   │   ├── 📄 proxy.py
│   │   │       │   │   ├── 📄 request.py
│   │   │       │   │   ├── 📄 response.py
│   │   │       │   │   ├── 📄 retry.py
│   │   │       │   │   ├── 📄 ssl_.py
│   │   │       │   │   ├── 📄 ssl_match_hostname.py
│   │   │       │   │   ├── 📄 ssltransport.py
│   │   │       │   │   ├── 📄 timeout.py
│   │   │       │   │   ├── 📄 url.py
│   │   │       │   │   ├── 📄 util.py
│   │   │       │   │   └── 📄 wait.py
│   │   │       │   ├── 📄 connection.py
│   │   │       │   ├── 📄 connectionpool.py
│   │   │       │   ├── 📄 exceptions.py
│   │   │       │   ├── 📄 fields.py
│   │   │       │   ├── 📄 filepost.py
│   │   │       │   ├── 📄 poolmanager.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   └── 📄 response.py
│   │   │       ├── 📁 urllib3-2.5.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📄 LICENSE.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📁 uvicorn/
│   │   │       │   ├── 📁 lifespan/
│   │   │       │   │   ├── 📄 off.py
│   │   │       │   │   └── 📄 on.py
│   │   │       │   ├── 📁 loops/
│   │   │       │   │   ├── 📄 asyncio.py
│   │   │       │   │   ├── 📄 auto.py
│   │   │       │   │   └── 📄 uvloop.py
│   │   │       │   ├── 📁 middleware/
│   │   │       │   │   ├── 📄 asgi2.py
│   │   │       │   │   ├── 📄 message_logger.py
│   │   │       │   │   ├── 📄 proxy_headers.py
│   │   │       │   │   └── 📄 wsgi.py
│   │   │       │   ├── 📁 protocols/
│   │   │       │   │   ├── 📁 http/
│   │   │       │   │   │   ├── 📄 auto.py
│   │   │       │   │   │   ├── 📄 flow_control.py
│   │   │       │   │   │   ├── 📄 h11_impl.py
│   │   │       │   │   │   └── 📄 httptools_impl.py
│   │   │       │   │   ├── 📁 websockets/
│   │   │       │   │   │   ├── 📄 auto.py
│   │   │       │   │   │   ├── 📄 websockets_impl.py
│   │   │       │   │   │   ├── 📄 websockets_sansio_impl.py
│   │   │       │   │   │   └── 📄 wsproto_impl.py
│   │   │       │   │   └── 📄 utils.py
│   │   │       │   ├── 📁 supervisors/
│   │   │       │   │   ├── 📄 basereload.py
│   │   │       │   │   ├── 📄 multiprocess.py
│   │   │       │   │   ├── 📄 statreload.py
│   │   │       │   │   └── 📄 watchfilesreload.py
│   │   │       │   ├── 📄 config.py
│   │   │       │   ├── 📄 importer.py
│   │   │       │   ├── 📄 logging.py
│   │   │       │   ├── 📄 main.py
│   │   │       │   ├── 📄 py.typed
│   │   │       │   ├── 📄 server.py
│   │   │       │   └── 📄 workers.py
│   │   │       ├── 📁 uvicorn-0.38.0.dist-info/
│   │   │       │   ├── 📁 licenses/
│   │   │       │   │   └── 📝 LICENSE.md
│   │   │       │   ├── 📄 entry_points.txt
│   │   │       │   ├── 📄 INSTALLER
│   │   │       │   ├── 📄 METADATA
│   │   │       │   ├── 📄 RECORD
│   │   │       │   ├── 📄 REQUESTED
│   │   │       │   └── 📄 WHEEL
│   │   │       ├── 📄 google_auth_httplib2.py
│   │   │       ├── 📄 six.py
│   │   │       └── 📄 typing_extensions.py
│   │   ├── 📁 Scripts/
│   │   │   ├── 📄 activate
│   │   │   ├── 📄 activate.bat
│   │   │   ├── 📄 activate.fish
│   │   │   ├── 📄 Activate.ps1
│   │   │   ├── 📄 alembic.exe
│   │   │   ├── 📄 deactivate.bat
│   │   │   ├── 📄 dotenv.exe
│   │   │   ├── 📄 email_validator.exe
│   │   │   ├── 📄 fastapi.exe
│   │   │   ├── 📄 google-oauthlib-tool.exe
│   │   │   ├── 📄 httpx.exe
│   │   │   ├── 📄 mako-render.exe
│   │   │   ├── 📄 normalizer.exe
│   │   │   ├── 📄 pip.exe
│   │   │   ├── 📄 pip3.13.exe
│   │   │   ├── 📄 pip3.exe
│   │   │   ├── 📄 pyrsa-decrypt.exe
│   │   │   ├── 📄 pyrsa-encrypt.exe
│   │   │   ├── 📄 pyrsa-keygen.exe
│   │   │   ├── 📄 pyrsa-priv2pub.exe
│   │   │   ├── 📄 pyrsa-sign.exe
│   │   │   ├── 📄 pyrsa-verify.exe
│   │   │   ├── 📄 python.exe
│   │   │   ├── 📄 pythonw.exe
│   │   │   └── 📄 uvicorn.exe
│   │   └── 📄 pyvenv.cfg
│   ├── 📄 alembic.ini
│   ├── 📝 DRIVE_SETUP_IMPLEMENTATION_PLAN.md
│   ├── 📋 package-lock.json
│   ├── 📄 requirements.txt
│   └── 📋 service-account.json
├── 📁 social_media_poster_frontend/
│   ├── 📁 node_modules/
│   │   ├── 📁 .bin/
│   │   │   ├── 📄 baseline-browser-mapping
│   │   │   ├── 📄 baseline-browser-mapping.cmd
│   │   │   ├── 📄 baseline-browser-mapping.ps1
│   │   │   ├── 📄 browserslist
│   │   │   ├── 📄 browserslist.cmd
│   │   │   ├── 📄 browserslist.ps1
│   │   │   ├── 📄 esbuild
│   │   │   ├── 📄 esbuild.cmd
│   │   │   ├── 📄 esbuild.ps1
│   │   │   ├── 📄 jsesc
│   │   │   ├── 📄 jsesc.cmd
│   │   │   ├── 📄 jsesc.ps1
│   │   │   ├── 📄 json5
│   │   │   ├── 📄 json5.cmd
│   │   │   ├── 📄 json5.ps1
│   │   │   ├── 📄 loose-envify
│   │   │   ├── 📄 loose-envify.cmd
│   │   │   ├── 📄 loose-envify.ps1
│   │   │   ├── 📄 nanoid
│   │   │   ├── 📄 nanoid.cmd
│   │   │   ├── 📄 nanoid.ps1
│   │   │   ├── 📄 parser
│   │   │   ├── 📄 parser.cmd
│   │   │   ├── 📄 parser.ps1
│   │   │   ├── 📄 rollup
│   │   │   ├── 📄 rollup.cmd
│   │   │   ├── 📄 rollup.ps1
│   │   │   ├── 📄 semver
│   │   │   ├── 📄 semver.cmd
│   │   │   ├── 📄 semver.ps1
│   │   │   ├── 📄 update-browserslist-db
│   │   │   ├── 📄 update-browserslist-db.cmd
│   │   │   ├── 📄 update-browserslist-db.ps1
│   │   │   ├── 📄 vite
│   │   │   ├── 📄 vite.cmd
│   │   │   └── 📄 vite.ps1
│   │   ├── 📁 .vite/
│   │   │   └── 📁 deps/
│   │   │       ├── 🟨 axios.js
│   │   │       ├── 📄 axios.js.map
│   │   │       ├── 🟨 chunk-DRWLMN53.js
│   │   │       ├── 📄 chunk-DRWLMN53.js.map
│   │   │       ├── 🟨 chunk-G3PMV62Z.js
│   │   │       ├── 📄 chunk-G3PMV62Z.js.map
│   │   │       ├── 🟨 chunk-PJEEZAML.js
│   │   │       ├── 📄 chunk-PJEEZAML.js.map
│   │   │       ├── 🟨 jwt-decode.js
│   │   │       ├── 📄 jwt-decode.js.map
│   │   │       ├── 📋 package.json
│   │   │       ├── 🟨 react_jsx-dev-runtime.js
│   │   │       ├── 📄 react_jsx-dev-runtime.js.map
│   │   │       ├── 🟨 react_jsx-runtime.js
│   │   │       ├── 📄 react_jsx-runtime.js.map
│   │   │       ├── 🟨 react-dom_client.js
│   │   │       ├── 📄 react-dom_client.js.map
│   │   │       ├── 🟨 react-dom.js
│   │   │       ├── 📄 react-dom.js.map
│   │   │       ├── 🟨 react-router-dom.js
│   │   │       ├── 📄 react-router-dom.js.map
│   │   │       ├── 🟨 react.js
│   │   │       └── 📄 react.js.map
│   │   ├── 📁 @babel/
│   │   │   ├── 📁 code-frame/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 compat-data/
│   │   │   │   ├── 📁 data/
│   │   │   │   │   ├── 📋 corejs2-built-ins.json
│   │   │   │   │   ├── 📋 corejs3-shipped-proposals.json
│   │   │   │   │   ├── 📋 native-modules.json
│   │   │   │   │   ├── 📋 overlapping-plugins.json
│   │   │   │   │   ├── 📋 plugin-bugfixes.json
│   │   │   │   │   └── 📋 plugins.json
│   │   │   │   ├── 🟨 corejs2-built-ins.js
│   │   │   │   ├── 🟨 corejs3-shipped-proposals.js
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 🟨 native-modules.js
│   │   │   │   ├── 🟨 overlapping-plugins.js
│   │   │   │   ├── 📋 package.json
│   │   │   │   ├── 🟨 plugin-bugfixes.js
│   │   │   │   ├── 🟨 plugins.js
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 core/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 📁 config/
│   │   │   │   │   │   ├── 📁 files/
│   │   │   │   │   │   │   ├── 🟨 configuration.js
│   │   │   │   │   │   │   ├── 📄 configuration.js.map
│   │   │   │   │   │   │   ├── 📄 import.cjs
│   │   │   │   │   │   │   ├── 📄 import.cjs.map
│   │   │   │   │   │   │   ├── 🟨 index-browser.js
│   │   │   │   │   │   │   ├── 📄 index-browser.js.map
│   │   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   │   ├── 🟨 module-types.js
│   │   │   │   │   │   │   ├── 📄 module-types.js.map
│   │   │   │   │   │   │   ├── 🟨 package.js
│   │   │   │   │   │   │   ├── 📄 package.js.map
│   │   │   │   │   │   │   ├── 🟨 plugins.js
│   │   │   │   │   │   │   ├── 📄 plugins.js.map
│   │   │   │   │   │   │   ├── 🟨 types.js
│   │   │   │   │   │   │   ├── 📄 types.js.map
│   │   │   │   │   │   │   ├── 🟨 utils.js
│   │   │   │   │   │   │   └── 📄 utils.js.map
│   │   │   │   │   │   ├── 📁 helpers/
│   │   │   │   │   │   │   ├── 🟨 config-api.js
│   │   │   │   │   │   │   ├── 📄 config-api.js.map
│   │   │   │   │   │   │   ├── 🟨 deep-array.js
│   │   │   │   │   │   │   ├── 📄 deep-array.js.map
│   │   │   │   │   │   │   ├── 🟨 environment.js
│   │   │   │   │   │   │   └── 📄 environment.js.map
│   │   │   │   │   │   ├── 📁 validation/
│   │   │   │   │   │   │   ├── 🟨 option-assertions.js
│   │   │   │   │   │   │   ├── 📄 option-assertions.js.map
│   │   │   │   │   │   │   ├── 🟨 options.js
│   │   │   │   │   │   │   ├── 📄 options.js.map
│   │   │   │   │   │   │   ├── 🟨 plugins.js
│   │   │   │   │   │   │   ├── 📄 plugins.js.map
│   │   │   │   │   │   │   ├── 🟨 removed.js
│   │   │   │   │   │   │   └── 📄 removed.js.map
│   │   │   │   │   │   ├── 🟨 cache-contexts.js
│   │   │   │   │   │   ├── 📄 cache-contexts.js.map
│   │   │   │   │   │   ├── 🟨 caching.js
│   │   │   │   │   │   ├── 📄 caching.js.map
│   │   │   │   │   │   ├── 🟨 config-chain.js
│   │   │   │   │   │   ├── 📄 config-chain.js.map
│   │   │   │   │   │   ├── 🟨 config-descriptors.js
│   │   │   │   │   │   ├── 📄 config-descriptors.js.map
│   │   │   │   │   │   ├── 🟨 full.js
│   │   │   │   │   │   ├── 📄 full.js.map
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   ├── 🟨 item.js
│   │   │   │   │   │   ├── 📄 item.js.map
│   │   │   │   │   │   ├── 🟨 partial.js
│   │   │   │   │   │   ├── 📄 partial.js.map
│   │   │   │   │   │   ├── 🟨 pattern-to-regex.js
│   │   │   │   │   │   ├── 📄 pattern-to-regex.js.map
│   │   │   │   │   │   ├── 🟨 plugin.js
│   │   │   │   │   │   ├── 📄 plugin.js.map
│   │   │   │   │   │   ├── 🟨 printer.js
│   │   │   │   │   │   ├── 📄 printer.js.map
│   │   │   │   │   │   ├── 🟨 resolve-targets-browser.js
│   │   │   │   │   │   ├── 📄 resolve-targets-browser.js.map
│   │   │   │   │   │   ├── 🟨 resolve-targets.js
│   │   │   │   │   │   ├── 📄 resolve-targets.js.map
│   │   │   │   │   │   ├── 🟨 util.js
│   │   │   │   │   │   └── 📄 util.js.map
│   │   │   │   │   ├── 📁 errors/
│   │   │   │   │   │   ├── 🟨 config-error.js
│   │   │   │   │   │   ├── 📄 config-error.js.map
│   │   │   │   │   │   ├── 🟨 rewrite-stack-trace.js
│   │   │   │   │   │   └── 📄 rewrite-stack-trace.js.map
│   │   │   │   │   ├── 📁 gensync-utils/
│   │   │   │   │   │   ├── 🟨 async.js
│   │   │   │   │   │   ├── 📄 async.js.map
│   │   │   │   │   │   ├── 🟨 fs.js
│   │   │   │   │   │   ├── 📄 fs.js.map
│   │   │   │   │   │   ├── 🟨 functional.js
│   │   │   │   │   │   └── 📄 functional.js.map
│   │   │   │   │   ├── 📁 parser/
│   │   │   │   │   │   ├── 📁 util/
│   │   │   │   │   │   │   ├── 🟨 missing-plugin-helper.js
│   │   │   │   │   │   │   └── 📄 missing-plugin-helper.js.map
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   └── 📄 index.js.map
│   │   │   │   │   ├── 📁 tools/
│   │   │   │   │   │   ├── 🟨 build-external-helpers.js
│   │   │   │   │   │   └── 📄 build-external-helpers.js.map
│   │   │   │   │   ├── 📁 transformation/
│   │   │   │   │   │   ├── 📁 file/
│   │   │   │   │   │   │   ├── 📄 babel-7-helpers.cjs
│   │   │   │   │   │   │   ├── 📄 babel-7-helpers.cjs.map
│   │   │   │   │   │   │   ├── 🟨 file.js
│   │   │   │   │   │   │   ├── 📄 file.js.map
│   │   │   │   │   │   │   ├── 🟨 generate.js
│   │   │   │   │   │   │   ├── 📄 generate.js.map
│   │   │   │   │   │   │   ├── 🟨 merge-map.js
│   │   │   │   │   │   │   └── 📄 merge-map.js.map
│   │   │   │   │   │   ├── 📁 util/
│   │   │   │   │   │   │   ├── 🟨 clone-deep.js
│   │   │   │   │   │   │   └── 📄 clone-deep.js.map
│   │   │   │   │   │   ├── 🟨 block-hoist-plugin.js
│   │   │   │   │   │   ├── 📄 block-hoist-plugin.js.map
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   ├── 🟨 normalize-file.js
│   │   │   │   │   │   ├── 📄 normalize-file.js.map
│   │   │   │   │   │   ├── 🟨 normalize-opts.js
│   │   │   │   │   │   ├── 📄 normalize-opts.js.map
│   │   │   │   │   │   ├── 🟨 plugin-pass.js
│   │   │   │   │   │   └── 📄 plugin-pass.js.map
│   │   │   │   │   ├── 📁 vendor/
│   │   │   │   │   │   ├── 🟨 import-meta-resolve.js
│   │   │   │   │   │   └── 📄 import-meta-resolve.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 parse.js
│   │   │   │   │   ├── 📄 parse.js.map
│   │   │   │   │   ├── 🟨 transform-ast.js
│   │   │   │   │   ├── 📄 transform-ast.js.map
│   │   │   │   │   ├── 🟨 transform-file-browser.js
│   │   │   │   │   ├── 📄 transform-file-browser.js.map
│   │   │   │   │   ├── 🟨 transform-file.js
│   │   │   │   │   ├── 📄 transform-file.js.map
│   │   │   │   │   ├── 🟨 transform.js
│   │   │   │   │   └── 📄 transform.js.map
│   │   │   │   ├── 📁 src/
│   │   │   │   │   ├── 📁 config/
│   │   │   │   │   │   ├── 📁 files/
│   │   │   │   │   │   │   ├── 📄 index-browser.ts
│   │   │   │   │   │   │   └── 📄 index.ts
│   │   │   │   │   │   ├── 📄 resolve-targets-browser.ts
│   │   │   │   │   │   └── 📄 resolve-targets.ts
│   │   │   │   │   ├── 📄 transform-file-browser.ts
│   │   │   │   │   └── 📄 transform-file.ts
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 generator/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 📁 generators/
│   │   │   │   │   │   ├── 🟨 base.js
│   │   │   │   │   │   ├── 📄 base.js.map
│   │   │   │   │   │   ├── 🟨 classes.js
│   │   │   │   │   │   ├── 📄 classes.js.map
│   │   │   │   │   │   ├── 🟨 deprecated.js
│   │   │   │   │   │   ├── 📄 deprecated.js.map
│   │   │   │   │   │   ├── 🟨 expressions.js
│   │   │   │   │   │   ├── 📄 expressions.js.map
│   │   │   │   │   │   ├── 🟨 flow.js
│   │   │   │   │   │   ├── 📄 flow.js.map
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   ├── 🟨 jsx.js
│   │   │   │   │   │   ├── 📄 jsx.js.map
│   │   │   │   │   │   ├── 🟨 methods.js
│   │   │   │   │   │   ├── 📄 methods.js.map
│   │   │   │   │   │   ├── 🟨 modules.js
│   │   │   │   │   │   ├── 📄 modules.js.map
│   │   │   │   │   │   ├── 🟨 statements.js
│   │   │   │   │   │   ├── 📄 statements.js.map
│   │   │   │   │   │   ├── 🟨 template-literals.js
│   │   │   │   │   │   ├── 📄 template-literals.js.map
│   │   │   │   │   │   ├── 🟨 types.js
│   │   │   │   │   │   ├── 📄 types.js.map
│   │   │   │   │   │   ├── 🟨 typescript.js
│   │   │   │   │   │   └── 📄 typescript.js.map
│   │   │   │   │   ├── 📁 node/
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   ├── 🟨 parentheses.js
│   │   │   │   │   │   ├── 📄 parentheses.js.map
│   │   │   │   │   │   ├── 🟨 whitespace.js
│   │   │   │   │   │   └── 📄 whitespace.js.map
│   │   │   │   │   ├── 🟨 buffer.js
│   │   │   │   │   ├── 📄 buffer.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 printer.js
│   │   │   │   │   ├── 📄 printer.js.map
│   │   │   │   │   ├── 🟨 source-map.js
│   │   │   │   │   ├── 📄 source-map.js.map
│   │   │   │   │   ├── 🟨 token-map.js
│   │   │   │   │   └── 📄 token-map.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-compilation-targets/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 debug.js
│   │   │   │   │   ├── 📄 debug.js.map
│   │   │   │   │   ├── 🟨 filter-items.js
│   │   │   │   │   ├── 📄 filter-items.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 options.js
│   │   │   │   │   ├── 📄 options.js.map
│   │   │   │   │   ├── 🟨 pretty.js
│   │   │   │   │   ├── 📄 pretty.js.map
│   │   │   │   │   ├── 🟨 targets.js
│   │   │   │   │   ├── 📄 targets.js.map
│   │   │   │   │   ├── 🟨 utils.js
│   │   │   │   │   └── 📄 utils.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-globals/
│   │   │   │   ├── 📁 data/
│   │   │   │   │   ├── 📋 browser-upper.json
│   │   │   │   │   ├── 📋 builtin-lower.json
│   │   │   │   │   └── 📋 builtin-upper.json
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-module-imports/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 import-builder.js
│   │   │   │   │   ├── 📄 import-builder.js.map
│   │   │   │   │   ├── 🟨 import-injector.js
│   │   │   │   │   ├── 📄 import-injector.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 is-module.js
│   │   │   │   │   └── 📄 is-module.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-module-transforms/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 dynamic-import.js
│   │   │   │   │   ├── 📄 dynamic-import.js.map
│   │   │   │   │   ├── 🟨 get-module-name.js
│   │   │   │   │   ├── 📄 get-module-name.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 lazy-modules.js
│   │   │   │   │   ├── 📄 lazy-modules.js.map
│   │   │   │   │   ├── 🟨 normalize-and-load-metadata.js
│   │   │   │   │   ├── 📄 normalize-and-load-metadata.js.map
│   │   │   │   │   ├── 🟨 rewrite-live-references.js
│   │   │   │   │   ├── 📄 rewrite-live-references.js.map
│   │   │   │   │   ├── 🟨 rewrite-this.js
│   │   │   │   │   └── 📄 rewrite-this.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-plugin-utils/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-string-parser/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-validator-identifier/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 identifier.js
│   │   │   │   │   ├── 📄 identifier.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 keyword.js
│   │   │   │   │   └── 📄 keyword.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helper-validator-option/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 find-suggestion.js
│   │   │   │   │   ├── 📄 find-suggestion.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 validator.js
│   │   │   │   │   └── 📄 validator.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 helpers/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 📁 helpers/
│   │   │   │   │   │   ├── 🟨 applyDecoratedDescriptor.js
│   │   │   │   │   │   ├── 📄 applyDecoratedDescriptor.js.map
│   │   │   │   │   │   ├── 🟨 applyDecs.js
│   │   │   │   │   │   ├── 📄 applyDecs.js.map
│   │   │   │   │   │   ├── 🟨 applyDecs2203.js
│   │   │   │   │   │   ├── 📄 applyDecs2203.js.map
│   │   │   │   │   │   ├── 🟨 applyDecs2203R.js
│   │   │   │   │   │   ├── 📄 applyDecs2203R.js.map
│   │   │   │   │   │   ├── 🟨 applyDecs2301.js
│   │   │   │   │   │   ├── 📄 applyDecs2301.js.map
│   │   │   │   │   │   ├── 🟨 applyDecs2305.js
│   │   │   │   │   │   ├── 📄 applyDecs2305.js.map
│   │   │   │   │   │   ├── 🟨 applyDecs2311.js
│   │   │   │   │   │   ├── 📄 applyDecs2311.js.map
│   │   │   │   │   │   ├── 🟨 arrayLikeToArray.js
│   │   │   │   │   │   ├── 📄 arrayLikeToArray.js.map
│   │   │   │   │   │   ├── 🟨 arrayWithHoles.js
│   │   │   │   │   │   ├── 📄 arrayWithHoles.js.map
│   │   │   │   │   │   ├── 🟨 arrayWithoutHoles.js
│   │   │   │   │   │   ├── 📄 arrayWithoutHoles.js.map
│   │   │   │   │   │   ├── 🟨 assertClassBrand.js
│   │   │   │   │   │   ├── 📄 assertClassBrand.js.map
│   │   │   │   │   │   ├── 🟨 assertThisInitialized.js
│   │   │   │   │   │   ├── 📄 assertThisInitialized.js.map
│   │   │   │   │   │   ├── 🟨 asyncGeneratorDelegate.js
│   │   │   │   │   │   ├── 📄 asyncGeneratorDelegate.js.map
│   │   │   │   │   │   ├── 🟨 asyncIterator.js
│   │   │   │   │   │   ├── 📄 asyncIterator.js.map
│   │   │   │   │   │   ├── 🟨 asyncToGenerator.js
│   │   │   │   │   │   ├── 📄 asyncToGenerator.js.map
│   │   │   │   │   │   ├── 🟨 awaitAsyncGenerator.js
│   │   │   │   │   │   ├── 📄 awaitAsyncGenerator.js.map
│   │   │   │   │   │   ├── 🟨 AwaitValue.js
│   │   │   │   │   │   ├── 📄 AwaitValue.js.map
│   │   │   │   │   │   ├── 🟨 callSuper.js
│   │   │   │   │   │   ├── 📄 callSuper.js.map
│   │   │   │   │   │   ├── 🟨 checkInRHS.js
│   │   │   │   │   │   ├── 📄 checkInRHS.js.map
│   │   │   │   │   │   ├── 🟨 checkPrivateRedeclaration.js
│   │   │   │   │   │   ├── 📄 checkPrivateRedeclaration.js.map
│   │   │   │   │   │   ├── 🟨 classApplyDescriptorDestructureSet.js
│   │   │   │   │   │   ├── 📄 classApplyDescriptorDestructureSet.js.map
│   │   │   │   │   │   ├── 🟨 classApplyDescriptorGet.js
│   │   │   │   │   │   ├── 📄 classApplyDescriptorGet.js.map
│   │   │   │   │   │   ├── 🟨 classApplyDescriptorSet.js
│   │   │   │   │   │   ├── 📄 classApplyDescriptorSet.js.map
│   │   │   │   │   │   ├── 🟨 classCallCheck.js
│   │   │   │   │   │   ├── 📄 classCallCheck.js.map
│   │   │   │   │   │   ├── 🟨 classCheckPrivateStaticAccess.js
│   │   │   │   │   │   ├── 📄 classCheckPrivateStaticAccess.js.map
│   │   │   │   │   │   ├── 🟨 classCheckPrivateStaticFieldDescriptor.js
│   │   │   │   │   │   ├── 📄 classCheckPrivateStaticFieldDescriptor.js.map
│   │   │   │   │   │   ├── 🟨 classExtractFieldDescriptor.js
│   │   │   │   │   │   ├── 📄 classExtractFieldDescriptor.js.map
│   │   │   │   │   │   ├── 🟨 classNameTDZError.js
│   │   │   │   │   │   ├── 📄 classNameTDZError.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldDestructureSet.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldDestructureSet.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldGet.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldGet.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldGet2.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldGet2.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldInitSpec.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldInitSpec.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldLooseBase.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldLooseBase.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldLooseKey.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldLooseKey.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldSet.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldSet.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateFieldSet2.js
│   │   │   │   │   │   ├── 📄 classPrivateFieldSet2.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateGetter.js
│   │   │   │   │   │   ├── 📄 classPrivateGetter.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateMethodGet.js
│   │   │   │   │   │   ├── 📄 classPrivateMethodGet.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateMethodInitSpec.js
│   │   │   │   │   │   ├── 📄 classPrivateMethodInitSpec.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateMethodSet.js
│   │   │   │   │   │   ├── 📄 classPrivateMethodSet.js.map
│   │   │   │   │   │   ├── 🟨 classPrivateSetter.js
│   │   │   │   │   │   ├── 📄 classPrivateSetter.js.map
│   │   │   │   │   │   ├── 🟨 classStaticPrivateFieldDestructureSet.js
│   │   │   │   │   │   ├── 📄 classStaticPrivateFieldDestructureSet.js.map
│   │   │   │   │   │   ├── 🟨 classStaticPrivateFieldSpecGet.js
│   │   │   │   │   │   ├── 📄 classStaticPrivateFieldSpecGet.js.map
│   │   │   │   │   │   ├── 🟨 classStaticPrivateFieldSpecSet.js
│   │   │   │   │   │   ├── 📄 classStaticPrivateFieldSpecSet.js.map
│   │   │   │   │   │   ├── 🟨 classStaticPrivateMethodGet.js
│   │   │   │   │   │   ├── 📄 classStaticPrivateMethodGet.js.map
│   │   │   │   │   │   ├── 🟨 classStaticPrivateMethodSet.js
│   │   │   │   │   │   ├── 📄 classStaticPrivateMethodSet.js.map
│   │   │   │   │   │   ├── 🟨 construct.js
│   │   │   │   │   │   ├── 📄 construct.js.map
│   │   │   │   │   │   ├── 🟨 createClass.js
│   │   │   │   │   │   ├── 📄 createClass.js.map
│   │   │   │   │   │   ├── 🟨 createForOfIteratorHelper.js
│   │   │   │   │   │   ├── 📄 createForOfIteratorHelper.js.map
│   │   │   │   │   │   ├── 🟨 createForOfIteratorHelperLoose.js
│   │   │   │   │   │   ├── 📄 createForOfIteratorHelperLoose.js.map
│   │   │   │   │   │   ├── 🟨 createSuper.js
│   │   │   │   │   │   ├── 📄 createSuper.js.map
│   │   │   │   │   │   ├── 🟨 decorate.js
│   │   │   │   │   │   ├── 📄 decorate.js.map
│   │   │   │   │   │   ├── 🟨 defaults.js
│   │   │   │   │   │   ├── 📄 defaults.js.map
│   │   │   │   │   │   ├── 🟨 defineAccessor.js
│   │   │   │   │   │   ├── 📄 defineAccessor.js.map
│   │   │   │   │   │   ├── 🟨 defineEnumerableProperties.js
│   │   │   │   │   │   ├── 📄 defineEnumerableProperties.js.map
│   │   │   │   │   │   ├── 🟨 defineProperty.js
│   │   │   │   │   │   ├── 📄 defineProperty.js.map
│   │   │   │   │   │   ├── 🟨 dispose.js
│   │   │   │   │   │   ├── 📄 dispose.js.map
│   │   │   │   │   │   ├── 🟨 extends.js
│   │   │   │   │   │   ├── 📄 extends.js.map
│   │   │   │   │   │   ├── 🟨 get.js
│   │   │   │   │   │   ├── 📄 get.js.map
│   │   │   │   │   │   ├── 🟨 getPrototypeOf.js
│   │   │   │   │   │   ├── 📄 getPrototypeOf.js.map
│   │   │   │   │   │   ├── 🟨 identity.js
│   │   │   │   │   │   ├── 📄 identity.js.map
│   │   │   │   │   │   ├── 🟨 importDeferProxy.js
│   │   │   │   │   │   ├── 📄 importDeferProxy.js.map
│   │   │   │   │   │   ├── 🟨 inherits.js
│   │   │   │   │   │   ├── 📄 inherits.js.map
│   │   │   │   │   │   ├── 🟨 inheritsLoose.js
│   │   │   │   │   │   ├── 📄 inheritsLoose.js.map
│   │   │   │   │   │   ├── 🟨 initializerDefineProperty.js
│   │   │   │   │   │   ├── 📄 initializerDefineProperty.js.map
│   │   │   │   │   │   ├── 🟨 initializerWarningHelper.js
│   │   │   │   │   │   ├── 📄 initializerWarningHelper.js.map
│   │   │   │   │   │   ├── 🟨 instanceof.js
│   │   │   │   │   │   ├── 📄 instanceof.js.map
│   │   │   │   │   │   ├── 🟨 interopRequireDefault.js
│   │   │   │   │   │   ├── 📄 interopRequireDefault.js.map
│   │   │   │   │   │   ├── 🟨 interopRequireWildcard.js
│   │   │   │   │   │   ├── 📄 interopRequireWildcard.js.map
│   │   │   │   │   │   ├── 🟨 isNativeFunction.js
│   │   │   │   │   │   ├── 📄 isNativeFunction.js.map
│   │   │   │   │   │   ├── 🟨 isNativeReflectConstruct.js
│   │   │   │   │   │   ├── 📄 isNativeReflectConstruct.js.map
│   │   │   │   │   │   ├── 🟨 iterableToArray.js
│   │   │   │   │   │   ├── 📄 iterableToArray.js.map
│   │   │   │   │   │   ├── 🟨 iterableToArrayLimit.js
│   │   │   │   │   │   ├── 📄 iterableToArrayLimit.js.map
│   │   │   │   │   │   ├── 🟨 jsx.js
│   │   │   │   │   │   ├── 📄 jsx.js.map
│   │   │   │   │   │   ├── 🟨 maybeArrayLike.js
│   │   │   │   │   │   ├── 📄 maybeArrayLike.js.map
│   │   │   │   │   │   ├── 🟨 newArrowCheck.js
│   │   │   │   │   │   ├── 📄 newArrowCheck.js.map
│   │   │   │   │   │   ├── 🟨 nonIterableRest.js
│   │   │   │   │   │   ├── 📄 nonIterableRest.js.map
│   │   │   │   │   │   ├── 🟨 nonIterableSpread.js
│   │   │   │   │   │   ├── 📄 nonIterableSpread.js.map
│   │   │   │   │   │   ├── 🟨 nullishReceiverError.js
│   │   │   │   │   │   ├── 📄 nullishReceiverError.js.map
│   │   │   │   │   │   ├── 🟨 objectDestructuringEmpty.js
│   │   │   │   │   │   ├── 📄 objectDestructuringEmpty.js.map
│   │   │   │   │   │   ├── 🟨 objectSpread.js
│   │   │   │   │   │   ├── 📄 objectSpread.js.map
│   │   │   │   │   │   ├── 🟨 objectSpread2.js
│   │   │   │   │   │   ├── 📄 objectSpread2.js.map
│   │   │   │   │   │   ├── 🟨 objectWithoutProperties.js
│   │   │   │   │   │   ├── 📄 objectWithoutProperties.js.map
│   │   │   │   │   │   ├── 🟨 objectWithoutPropertiesLoose.js
│   │   │   │   │   │   ├── 📄 objectWithoutPropertiesLoose.js.map
│   │   │   │   │   │   ├── 🟨 OverloadYield.js
│   │   │   │   │   │   ├── 📄 OverloadYield.js.map
│   │   │   │   │   │   ├── 🟨 possibleConstructorReturn.js
│   │   │   │   │   │   ├── 📄 possibleConstructorReturn.js.map
│   │   │   │   │   │   ├── 🟨 readOnlyError.js
│   │   │   │   │   │   ├── 📄 readOnlyError.js.map
│   │   │   │   │   │   ├── 🟨 regenerator.js
│   │   │   │   │   │   ├── 📄 regenerator.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorAsync.js
│   │   │   │   │   │   ├── 📄 regeneratorAsync.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorAsyncGen.js
│   │   │   │   │   │   ├── 📄 regeneratorAsyncGen.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorAsyncIterator.js
│   │   │   │   │   │   ├── 📄 regeneratorAsyncIterator.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorDefine.js
│   │   │   │   │   │   ├── 📄 regeneratorDefine.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorKeys.js
│   │   │   │   │   │   ├── 📄 regeneratorKeys.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorRuntime.js
│   │   │   │   │   │   ├── 📄 regeneratorRuntime.js.map
│   │   │   │   │   │   ├── 🟨 regeneratorValues.js
│   │   │   │   │   │   ├── 📄 regeneratorValues.js.map
│   │   │   │   │   │   ├── 🟨 set.js
│   │   │   │   │   │   ├── 📄 set.js.map
│   │   │   │   │   │   ├── 🟨 setFunctionName.js
│   │   │   │   │   │   ├── 📄 setFunctionName.js.map
│   │   │   │   │   │   ├── 🟨 setPrototypeOf.js
│   │   │   │   │   │   ├── 📄 setPrototypeOf.js.map
│   │   │   │   │   │   ├── 🟨 skipFirstGeneratorNext.js
│   │   │   │   │   │   ├── 📄 skipFirstGeneratorNext.js.map
│   │   │   │   │   │   ├── 🟨 slicedToArray.js
│   │   │   │   │   │   ├── 📄 slicedToArray.js.map
│   │   │   │   │   │   ├── 🟨 superPropBase.js
│   │   │   │   │   │   ├── 📄 superPropBase.js.map
│   │   │   │   │   │   ├── 🟨 superPropGet.js
│   │   │   │   │   │   ├── 📄 superPropGet.js.map
│   │   │   │   │   │   ├── 🟨 superPropSet.js
│   │   │   │   │   │   ├── 📄 superPropSet.js.map
│   │   │   │   │   │   ├── 🟨 taggedTemplateLiteral.js
│   │   │   │   │   │   ├── 📄 taggedTemplateLiteral.js.map
│   │   │   │   │   │   ├── 🟨 taggedTemplateLiteralLoose.js
│   │   │   │   │   │   ├── 📄 taggedTemplateLiteralLoose.js.map
│   │   │   │   │   │   ├── 🟨 tdz.js
│   │   │   │   │   │   ├── 📄 tdz.js.map
│   │   │   │   │   │   ├── 🟨 temporalRef.js
│   │   │   │   │   │   ├── 📄 temporalRef.js.map
│   │   │   │   │   │   ├── 🟨 temporalUndefined.js
│   │   │   │   │   │   ├── 📄 temporalUndefined.js.map
│   │   │   │   │   │   ├── 🟨 toArray.js
│   │   │   │   │   │   ├── 📄 toArray.js.map
│   │   │   │   │   │   ├── 🟨 toConsumableArray.js
│   │   │   │   │   │   ├── 📄 toConsumableArray.js.map
│   │   │   │   │   │   ├── 🟨 toPrimitive.js
│   │   │   │   │   │   ├── 📄 toPrimitive.js.map
│   │   │   │   │   │   ├── 🟨 toPropertyKey.js
│   │   │   │   │   │   ├── 📄 toPropertyKey.js.map
│   │   │   │   │   │   ├── 🟨 toSetter.js
│   │   │   │   │   │   ├── 📄 toSetter.js.map
│   │   │   │   │   │   ├── 🟨 tsRewriteRelativeImportExtensions.js
│   │   │   │   │   │   ├── 📄 tsRewriteRelativeImportExtensions.js.map
│   │   │   │   │   │   ├── 🟨 typeof.js
│   │   │   │   │   │   ├── 📄 typeof.js.map
│   │   │   │   │   │   ├── 🟨 unsupportedIterableToArray.js
│   │   │   │   │   │   ├── 📄 unsupportedIterableToArray.js.map
│   │   │   │   │   │   ├── 🟨 using.js
│   │   │   │   │   │   ├── 📄 using.js.map
│   │   │   │   │   │   ├── 🟨 usingCtx.js
│   │   │   │   │   │   ├── 📄 usingCtx.js.map
│   │   │   │   │   │   ├── 🟨 wrapAsyncGenerator.js
│   │   │   │   │   │   ├── 📄 wrapAsyncGenerator.js.map
│   │   │   │   │   │   ├── 🟨 wrapNativeSuper.js
│   │   │   │   │   │   ├── 📄 wrapNativeSuper.js.map
│   │   │   │   │   │   ├── 🟨 wrapRegExp.js
│   │   │   │   │   │   ├── 📄 wrapRegExp.js.map
│   │   │   │   │   │   ├── 🟨 writeOnlyError.js
│   │   │   │   │   │   └── 📄 writeOnlyError.js.map
│   │   │   │   │   ├── 🟨 helpers-generated.js
│   │   │   │   │   ├── 📄 helpers-generated.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 parser/
│   │   │   │   ├── 📁 bin/
│   │   │   │   │   └── 🟨 babel-parser.js
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📁 typings/
│   │   │   │   │   └── 📄 babel-parser.d.ts
│   │   │   │   ├── 📝 CHANGELOG.md
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 plugin-transform-react-jsx-self/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 plugin-transform-react-jsx-source/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📄 index.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 template/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 builder.js
│   │   │   │   │   ├── 📄 builder.js.map
│   │   │   │   │   ├── 🟨 formatters.js
│   │   │   │   │   ├── 📄 formatters.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 literal.js
│   │   │   │   │   ├── 📄 literal.js.map
│   │   │   │   │   ├── 🟨 options.js
│   │   │   │   │   ├── 📄 options.js.map
│   │   │   │   │   ├── 🟨 parse.js
│   │   │   │   │   ├── 📄 parse.js.map
│   │   │   │   │   ├── 🟨 populate.js
│   │   │   │   │   ├── 📄 populate.js.map
│   │   │   │   │   ├── 🟨 string.js
│   │   │   │   │   └── 📄 string.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 traverse/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 📁 path/
│   │   │   │   │   │   ├── 📁 inference/
│   │   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   │   ├── 🟨 inferer-reference.js
│   │   │   │   │   │   │   ├── 📄 inferer-reference.js.map
│   │   │   │   │   │   │   ├── 🟨 inferers.js
│   │   │   │   │   │   │   ├── 📄 inferers.js.map
│   │   │   │   │   │   │   ├── 🟨 util.js
│   │   │   │   │   │   │   └── 📄 util.js.map
│   │   │   │   │   │   ├── 📁 lib/
│   │   │   │   │   │   │   ├── 🟨 hoister.js
│   │   │   │   │   │   │   ├── 📄 hoister.js.map
│   │   │   │   │   │   │   ├── 🟨 removal-hooks.js
│   │   │   │   │   │   │   ├── 📄 removal-hooks.js.map
│   │   │   │   │   │   │   ├── 🟨 virtual-types-validator.js
│   │   │   │   │   │   │   ├── 📄 virtual-types-validator.js.map
│   │   │   │   │   │   │   ├── 🟨 virtual-types.js
│   │   │   │   │   │   │   └── 📄 virtual-types.js.map
│   │   │   │   │   │   ├── 🟨 ancestry.js
│   │   │   │   │   │   ├── 📄 ancestry.js.map
│   │   │   │   │   │   ├── 🟨 comments.js
│   │   │   │   │   │   ├── 📄 comments.js.map
│   │   │   │   │   │   ├── 🟨 context.js
│   │   │   │   │   │   ├── 📄 context.js.map
│   │   │   │   │   │   ├── 🟨 conversion.js
│   │   │   │   │   │   ├── 📄 conversion.js.map
│   │   │   │   │   │   ├── 🟨 evaluation.js
│   │   │   │   │   │   ├── 📄 evaluation.js.map
│   │   │   │   │   │   ├── 🟨 family.js
│   │   │   │   │   │   ├── 📄 family.js.map
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   ├── 🟨 introspection.js
│   │   │   │   │   │   ├── 📄 introspection.js.map
│   │   │   │   │   │   ├── 🟨 modification.js
│   │   │   │   │   │   ├── 📄 modification.js.map
│   │   │   │   │   │   ├── 🟨 removal.js
│   │   │   │   │   │   ├── 📄 removal.js.map
│   │   │   │   │   │   ├── 🟨 replacement.js
│   │   │   │   │   │   └── 📄 replacement.js.map
│   │   │   │   │   ├── 📁 scope/
│   │   │   │   │   │   ├── 📁 lib/
│   │   │   │   │   │   │   ├── 🟨 renamer.js
│   │   │   │   │   │   │   └── 📄 renamer.js.map
│   │   │   │   │   │   ├── 🟨 binding.js
│   │   │   │   │   │   ├── 📄 binding.js.map
│   │   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   │   ├── 🟨 traverseForScope.js
│   │   │   │   │   │   └── 📄 traverseForScope.js.map
│   │   │   │   │   ├── 🟨 cache.js
│   │   │   │   │   ├── 📄 cache.js.map
│   │   │   │   │   ├── 🟨 context.js
│   │   │   │   │   ├── 📄 context.js.map
│   │   │   │   │   ├── 🟨 hub.js
│   │   │   │   │   ├── 📄 hub.js.map
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 index.js.map
│   │   │   │   │   ├── 🟨 traverse-node.js
│   │   │   │   │   ├── 📄 traverse-node.js.map
│   │   │   │   │   ├── 🟨 types.js
│   │   │   │   │   ├── 📄 types.js.map
│   │   │   │   │   ├── 🟨 visitors.js
│   │   │   │   │   └── 📄 visitors.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   ├── 📝 README.md
│   │   │   │   └── 📋 tsconfig.overrides.json
│   │   │   └── 📁 types/
│   │   │       ├── 📁 lib/
│   │   │       │   ├── 📁 asserts/
│   │   │       │   │   ├── 📁 generated/
│   │   │       │   │   │   ├── 🟨 index.js
│   │   │       │   │   │   └── 📄 index.js.map
│   │   │       │   │   ├── 🟨 assertNode.js
│   │   │       │   │   └── 📄 assertNode.js.map
│   │   │       │   ├── 📁 ast-types/
│   │   │       │   │   └── 📁 generated/
│   │   │       │   │       ├── 🟨 index.js
│   │   │       │   │       └── 📄 index.js.map
│   │   │       │   ├── 📁 builders/
│   │   │       │   │   ├── 📁 flow/
│   │   │       │   │   │   ├── 🟨 createFlowUnionType.js
│   │   │       │   │   │   ├── 📄 createFlowUnionType.js.map
│   │   │       │   │   │   ├── 🟨 createTypeAnnotationBasedOnTypeof.js
│   │   │       │   │   │   └── 📄 createTypeAnnotationBasedOnTypeof.js.map
│   │   │       │   │   ├── 📁 generated/
│   │   │       │   │   │   ├── 🟨 index.js
│   │   │       │   │   │   ├── 📄 index.js.map
│   │   │       │   │   │   ├── 🟨 lowercase.js
│   │   │       │   │   │   ├── 📄 lowercase.js.map
│   │   │       │   │   │   ├── 🟨 uppercase.js
│   │   │       │   │   │   └── 📄 uppercase.js.map
│   │   │       │   │   ├── 📁 react/
│   │   │       │   │   │   ├── 🟨 buildChildren.js
│   │   │       │   │   │   └── 📄 buildChildren.js.map
│   │   │       │   │   ├── 📁 typescript/
│   │   │       │   │   │   ├── 🟨 createTSUnionType.js
│   │   │       │   │   │   └── 📄 createTSUnionType.js.map
│   │   │       │   │   ├── 🟨 productions.js
│   │   │       │   │   ├── 📄 productions.js.map
│   │   │       │   │   ├── 🟨 validateNode.js
│   │   │       │   │   └── 📄 validateNode.js.map
│   │   │       │   ├── 📁 clone/
│   │   │       │   │   ├── 🟨 clone.js
│   │   │       │   │   ├── 📄 clone.js.map
│   │   │       │   │   ├── 🟨 cloneDeep.js
│   │   │       │   │   ├── 📄 cloneDeep.js.map
│   │   │       │   │   ├── 🟨 cloneDeepWithoutLoc.js
│   │   │       │   │   ├── 📄 cloneDeepWithoutLoc.js.map
│   │   │       │   │   ├── 🟨 cloneNode.js
│   │   │       │   │   ├── 📄 cloneNode.js.map
│   │   │       │   │   ├── 🟨 cloneWithoutLoc.js
│   │   │       │   │   └── 📄 cloneWithoutLoc.js.map
│   │   │       │   ├── 📁 comments/
│   │   │       │   │   ├── 🟨 addComment.js
│   │   │       │   │   ├── 📄 addComment.js.map
│   │   │       │   │   ├── 🟨 addComments.js
│   │   │       │   │   ├── 📄 addComments.js.map
│   │   │       │   │   ├── 🟨 inheritInnerComments.js
│   │   │       │   │   ├── 📄 inheritInnerComments.js.map
│   │   │       │   │   ├── 🟨 inheritLeadingComments.js
│   │   │       │   │   ├── 📄 inheritLeadingComments.js.map
│   │   │       │   │   ├── 🟨 inheritsComments.js
│   │   │       │   │   ├── 📄 inheritsComments.js.map
│   │   │       │   │   ├── 🟨 inheritTrailingComments.js
│   │   │       │   │   ├── 📄 inheritTrailingComments.js.map
│   │   │       │   │   ├── 🟨 removeComments.js
│   │   │       │   │   └── 📄 removeComments.js.map
│   │   │       │   ├── 📁 constants/
│   │   │       │   │   ├── 📁 generated/
│   │   │       │   │   │   ├── 🟨 index.js
│   │   │       │   │   │   └── 📄 index.js.map
│   │   │       │   │   ├── 🟨 index.js
│   │   │       │   │   └── 📄 index.js.map
│   │   │       │   ├── 📁 converters/
│   │   │       │   │   ├── 🟨 ensureBlock.js
│   │   │       │   │   ├── 📄 ensureBlock.js.map
│   │   │       │   │   ├── 🟨 gatherSequenceExpressions.js
│   │   │       │   │   ├── 📄 gatherSequenceExpressions.js.map
│   │   │       │   │   ├── 🟨 toBindingIdentifierName.js
│   │   │       │   │   ├── 📄 toBindingIdentifierName.js.map
│   │   │       │   │   ├── 🟨 toBlock.js
│   │   │       │   │   ├── 📄 toBlock.js.map
│   │   │       │   │   ├── 🟨 toComputedKey.js
│   │   │       │   │   ├── 📄 toComputedKey.js.map
│   │   │       │   │   ├── 🟨 toExpression.js
│   │   │       │   │   ├── 📄 toExpression.js.map
│   │   │       │   │   ├── 🟨 toIdentifier.js
│   │   │       │   │   ├── 📄 toIdentifier.js.map
│   │   │       │   │   ├── 🟨 toKeyAlias.js
│   │   │       │   │   ├── 📄 toKeyAlias.js.map
│   │   │       │   │   ├── 🟨 toSequenceExpression.js
│   │   │       │   │   ├── 📄 toSequenceExpression.js.map
│   │   │       │   │   ├── 🟨 toStatement.js
│   │   │       │   │   ├── 📄 toStatement.js.map
│   │   │       │   │   ├── 🟨 valueToNode.js
│   │   │       │   │   └── 📄 valueToNode.js.map
│   │   │       │   ├── 📁 definitions/
│   │   │       │   │   ├── 🟨 core.js
│   │   │       │   │   ├── 📄 core.js.map
│   │   │       │   │   ├── 🟨 deprecated-aliases.js
│   │   │       │   │   ├── 📄 deprecated-aliases.js.map
│   │   │       │   │   ├── 🟨 experimental.js
│   │   │       │   │   ├── 📄 experimental.js.map
│   │   │       │   │   ├── 🟨 flow.js
│   │   │       │   │   ├── 📄 flow.js.map
│   │   │       │   │   ├── 🟨 index.js
│   │   │       │   │   ├── 📄 index.js.map
│   │   │       │   │   ├── 🟨 jsx.js
│   │   │       │   │   ├── 📄 jsx.js.map
│   │   │       │   │   ├── 🟨 misc.js
│   │   │       │   │   ├── 📄 misc.js.map
│   │   │       │   │   ├── 🟨 placeholders.js
│   │   │       │   │   ├── 📄 placeholders.js.map
│   │   │       │   │   ├── 🟨 typescript.js
│   │   │       │   │   ├── 📄 typescript.js.map
│   │   │       │   │   ├── 🟨 utils.js
│   │   │       │   │   └── 📄 utils.js.map
│   │   │       │   ├── 📁 modifications/
│   │   │       │   │   ├── 📁 flow/
│   │   │       │   │   │   ├── 🟨 removeTypeDuplicates.js
│   │   │       │   │   │   └── 📄 removeTypeDuplicates.js.map
│   │   │       │   │   ├── 📁 typescript/
│   │   │       │   │   │   ├── 🟨 removeTypeDuplicates.js
│   │   │       │   │   │   └── 📄 removeTypeDuplicates.js.map
│   │   │       │   │   ├── 🟨 appendToMemberExpression.js
│   │   │       │   │   ├── 📄 appendToMemberExpression.js.map
│   │   │       │   │   ├── 🟨 inherits.js
│   │   │       │   │   ├── 📄 inherits.js.map
│   │   │       │   │   ├── 🟨 prependToMemberExpression.js
│   │   │       │   │   ├── 📄 prependToMemberExpression.js.map
│   │   │       │   │   ├── 🟨 removeProperties.js
│   │   │       │   │   ├── 📄 removeProperties.js.map
│   │   │       │   │   ├── 🟨 removePropertiesDeep.js
│   │   │       │   │   └── 📄 removePropertiesDeep.js.map
│   │   │       │   ├── 📁 retrievers/
│   │   │       │   │   ├── 🟨 getAssignmentIdentifiers.js
│   │   │       │   │   ├── 📄 getAssignmentIdentifiers.js.map
│   │   │       │   │   ├── 🟨 getBindingIdentifiers.js
│   │   │       │   │   ├── 📄 getBindingIdentifiers.js.map
│   │   │       │   │   ├── 🟨 getFunctionName.js
│   │   │       │   │   ├── 📄 getFunctionName.js.map
│   │   │       │   │   ├── 🟨 getOuterBindingIdentifiers.js
│   │   │       │   │   └── 📄 getOuterBindingIdentifiers.js.map
│   │   │       │   ├── 📁 traverse/
│   │   │       │   │   ├── 🟨 traverse.js
│   │   │       │   │   ├── 📄 traverse.js.map
│   │   │       │   │   ├── 🟨 traverseFast.js
│   │   │       │   │   └── 📄 traverseFast.js.map
│   │   │       │   ├── 📁 utils/
│   │   │       │   │   ├── 📁 react/
│   │   │       │   │   │   ├── 🟨 cleanJSXElementLiteralChild.js
│   │   │       │   │   │   └── 📄 cleanJSXElementLiteralChild.js.map
│   │   │       │   │   ├── 🟨 deprecationWarning.js
│   │   │       │   │   ├── 📄 deprecationWarning.js.map
│   │   │       │   │   ├── 🟨 inherit.js
│   │   │       │   │   ├── 📄 inherit.js.map
│   │   │       │   │   ├── 🟨 shallowEqual.js
│   │   │       │   │   └── 📄 shallowEqual.js.map
│   │   │       │   ├── 📁 validators/
│   │   │       │   │   ├── 📁 generated/
│   │   │       │   │   │   ├── 🟨 index.js
│   │   │       │   │   │   └── 📄 index.js.map
│   │   │       │   │   ├── 📁 react/
│   │   │       │   │   │   ├── 🟨 isCompatTag.js
│   │   │       │   │   │   ├── 📄 isCompatTag.js.map
│   │   │       │   │   │   ├── 🟨 isReactComponent.js
│   │   │       │   │   │   └── 📄 isReactComponent.js.map
│   │   │       │   │   ├── 🟨 buildMatchMemberExpression.js
│   │   │       │   │   ├── 📄 buildMatchMemberExpression.js.map
│   │   │       │   │   ├── 🟨 is.js
│   │   │       │   │   ├── 📄 is.js.map
│   │   │       │   │   ├── 🟨 isBinding.js
│   │   │       │   │   ├── 📄 isBinding.js.map
│   │   │       │   │   ├── 🟨 isBlockScoped.js
│   │   │       │   │   ├── 📄 isBlockScoped.js.map
│   │   │       │   │   ├── 🟨 isImmutable.js
│   │   │       │   │   ├── 📄 isImmutable.js.map
│   │   │       │   │   ├── 🟨 isLet.js
│   │   │       │   │   ├── 📄 isLet.js.map
│   │   │       │   │   ├── 🟨 isNode.js
│   │   │       │   │   ├── 📄 isNode.js.map
│   │   │       │   │   ├── 🟨 isNodesEquivalent.js
│   │   │       │   │   ├── 📄 isNodesEquivalent.js.map
│   │   │       │   │   ├── 🟨 isPlaceholderType.js
│   │   │       │   │   ├── 📄 isPlaceholderType.js.map
│   │   │       │   │   ├── 🟨 isReferenced.js
│   │   │       │   │   ├── 📄 isReferenced.js.map
│   │   │       │   │   ├── 🟨 isScope.js
│   │   │       │   │   ├── 📄 isScope.js.map
│   │   │       │   │   ├── 🟨 isSpecifierDefault.js
│   │   │       │   │   ├── 📄 isSpecifierDefault.js.map
│   │   │       │   │   ├── 🟨 isType.js
│   │   │       │   │   ├── 📄 isType.js.map
│   │   │       │   │   ├── 🟨 isValidES3Identifier.js
│   │   │       │   │   ├── 📄 isValidES3Identifier.js.map
│   │   │       │   │   ├── 🟨 isValidIdentifier.js
│   │   │       │   │   ├── 📄 isValidIdentifier.js.map
│   │   │       │   │   ├── 🟨 isVar.js
│   │   │       │   │   ├── 📄 isVar.js.map
│   │   │       │   │   ├── 🟨 matchesPattern.js
│   │   │       │   │   ├── 📄 matchesPattern.js.map
│   │   │       │   │   ├── 🟨 validate.js
│   │   │       │   │   └── 📄 validate.js.map
│   │   │       │   ├── 📄 index-legacy.d.ts
│   │   │       │   ├── 📄 index.d.ts
│   │   │       │   ├── 🟨 index.js
│   │   │       │   ├── 📄 index.js.flow
│   │   │       │   └── 📄 index.js.map
│   │   │       ├── 📄 LICENSE
│   │   │       ├── 📋 package.json
│   │   │       └── 📝 README.md
│   │   ├── 📁 @esbuild/
│   │   │   └── 📁 win32-x64/
│   │   │       ├── 📄 esbuild.exe
│   │   │       ├── 📋 package.json
│   │   │       └── 📝 README.md
│   │   ├── 📁 @jridgewell/
│   │   │   ├── 📁 gen-mapping/
│   │   │   │   ├── 📁 dist/
│   │   │   │   │   ├── 📁 types/
│   │   │   │   │   │   ├── 📄 gen-mapping.d.ts
│   │   │   │   │   │   ├── 📄 set-array.d.ts
│   │   │   │   │   │   ├── 📄 sourcemap-segment.d.ts
│   │   │   │   │   │   └── 📄 types.d.ts
│   │   │   │   │   ├── 📄 gen-mapping.mjs
│   │   │   │   │   ├── 📄 gen-mapping.mjs.map
│   │   │   │   │   ├── 🟨 gen-mapping.umd.js
│   │   │   │   │   └── 📄 gen-mapping.umd.js.map
│   │   │   │   ├── 📁 src/
│   │   │   │   │   ├── 📄 gen-mapping.ts
│   │   │   │   │   ├── 📄 set-array.ts
│   │   │   │   │   ├── 📄 sourcemap-segment.ts
│   │   │   │   │   └── 📄 types.ts
│   │   │   │   ├── 📁 types/
│   │   │   │   │   ├── 📄 gen-mapping.d.cts
│   │   │   │   │   ├── 📄 gen-mapping.d.cts.map
│   │   │   │   │   ├── 📄 gen-mapping.d.mts
│   │   │   │   │   ├── 📄 gen-mapping.d.mts.map
│   │   │   │   │   ├── 📄 set-array.d.cts
│   │   │   │   │   ├── 📄 set-array.d.cts.map
│   │   │   │   │   ├── 📄 set-array.d.mts
│   │   │   │   │   ├── 📄 set-array.d.mts.map
│   │   │   │   │   ├── 📄 sourcemap-segment.d.cts
│   │   │   │   │   ├── 📄 sourcemap-segment.d.cts.map
│   │   │   │   │   ├── 📄 sourcemap-segment.d.mts
│   │   │   │   │   ├── 📄 sourcemap-segment.d.mts.map
│   │   │   │   │   ├── 📄 types.d.cts
│   │   │   │   │   ├── 📄 types.d.cts.map
│   │   │   │   │   ├── 📄 types.d.mts
│   │   │   │   │   └── 📄 types.d.mts.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 remapping/
│   │   │   │   ├── 📁 dist/
│   │   │   │   │   ├── 📄 remapping.mjs
│   │   │   │   │   ├── 📄 remapping.mjs.map
│   │   │   │   │   ├── 🟨 remapping.umd.js
│   │   │   │   │   └── 📄 remapping.umd.js.map
│   │   │   │   ├── 📁 src/
│   │   │   │   │   ├── 📄 build-source-map-tree.ts
│   │   │   │   │   ├── 📄 remapping.ts
│   │   │   │   │   ├── 📄 source-map-tree.ts
│   │   │   │   │   ├── 📄 source-map.ts
│   │   │   │   │   └── 📄 types.ts
│   │   │   │   ├── 📁 types/
│   │   │   │   │   ├── 📄 build-source-map-tree.d.cts
│   │   │   │   │   ├── 📄 build-source-map-tree.d.cts.map
│   │   │   │   │   ├── 📄 build-source-map-tree.d.mts
│   │   │   │   │   ├── 📄 build-source-map-tree.d.mts.map
│   │   │   │   │   ├── 📄 remapping.d.cts
│   │   │   │   │   ├── 📄 remapping.d.cts.map
│   │   │   │   │   ├── 📄 remapping.d.mts
│   │   │   │   │   ├── 📄 remapping.d.mts.map
│   │   │   │   │   ├── 📄 source-map-tree.d.cts
│   │   │   │   │   ├── 📄 source-map-tree.d.cts.map
│   │   │   │   │   ├── 📄 source-map-tree.d.mts
│   │   │   │   │   ├── 📄 source-map-tree.d.mts.map
│   │   │   │   │   ├── 📄 source-map.d.cts
│   │   │   │   │   ├── 📄 source-map.d.cts.map
│   │   │   │   │   ├── 📄 source-map.d.mts
│   │   │   │   │   ├── 📄 source-map.d.mts.map
│   │   │   │   │   ├── 📄 types.d.cts
│   │   │   │   │   ├── 📄 types.d.cts.map
│   │   │   │   │   ├── 📄 types.d.mts
│   │   │   │   │   └── 📄 types.d.mts.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 resolve-uri/
│   │   │   │   ├── 📁 dist/
│   │   │   │   │   ├── 📁 types/
│   │   │   │   │   │   └── 📄 resolve-uri.d.ts
│   │   │   │   │   ├── 📄 resolve-uri.mjs
│   │   │   │   │   ├── 📄 resolve-uri.mjs.map
│   │   │   │   │   ├── 🟨 resolve-uri.umd.js
│   │   │   │   │   └── 📄 resolve-uri.umd.js.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 sourcemap-codec/
│   │   │   │   ├── 📁 dist/
│   │   │   │   │   ├── 📄 sourcemap-codec.mjs
│   │   │   │   │   ├── 📄 sourcemap-codec.mjs.map
│   │   │   │   │   ├── 🟨 sourcemap-codec.umd.js
│   │   │   │   │   └── 📄 sourcemap-codec.umd.js.map
│   │   │   │   ├── 📁 src/
│   │   │   │   │   ├── 📄 scopes.ts
│   │   │   │   │   ├── 📄 sourcemap-codec.ts
│   │   │   │   │   ├── 📄 strings.ts
│   │   │   │   │   └── 📄 vlq.ts
│   │   │   │   ├── 📁 types/
│   │   │   │   │   ├── 📄 scopes.d.cts
│   │   │   │   │   ├── 📄 scopes.d.cts.map
│   │   │   │   │   ├── 📄 scopes.d.mts
│   │   │   │   │   ├── 📄 scopes.d.mts.map
│   │   │   │   │   ├── 📄 sourcemap-codec.d.cts
│   │   │   │   │   ├── 📄 sourcemap-codec.d.cts.map
│   │   │   │   │   ├── 📄 sourcemap-codec.d.mts
│   │   │   │   │   ├── 📄 sourcemap-codec.d.mts.map
│   │   │   │   │   ├── 📄 strings.d.cts
│   │   │   │   │   ├── 📄 strings.d.cts.map
│   │   │   │   │   ├── 📄 strings.d.mts
│   │   │   │   │   ├── 📄 strings.d.mts.map
│   │   │   │   │   ├── 📄 vlq.d.cts
│   │   │   │   │   ├── 📄 vlq.d.cts.map
│   │   │   │   │   ├── 📄 vlq.d.mts
│   │   │   │   │   └── 📄 vlq.d.mts.map
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   └── 📁 trace-mapping/
│   │   │       ├── 📁 dist/
│   │   │       │   ├── 📄 trace-mapping.mjs
│   │   │       │   ├── 📄 trace-mapping.mjs.map
│   │   │       │   ├── 🟨 trace-mapping.umd.js
│   │   │       │   └── 📄 trace-mapping.umd.js.map
│   │   │       ├── 📁 src/
│   │   │       │   ├── 📄 binary-search.ts
│   │   │       │   ├── 📄 by-source.ts
│   │   │       │   ├── 📄 flatten-map.ts
│   │   │       │   ├── 📄 resolve.ts
│   │   │       │   ├── 📄 sort.ts
│   │   │       │   ├── 📄 sourcemap-segment.ts
│   │   │       │   ├── 📄 strip-filename.ts
│   │   │       │   ├── 📄 trace-mapping.ts
│   │   │       │   └── 📄 types.ts
│   │   │       ├── 📁 types/
│   │   │       │   ├── 📄 binary-search.d.cts
│   │   │       │   ├── 📄 binary-search.d.cts.map
│   │   │       │   ├── 📄 binary-search.d.mts
│   │   │       │   ├── 📄 binary-search.d.mts.map
│   │   │       │   ├── 📄 by-source.d.cts
│   │   │       │   ├── 📄 by-source.d.cts.map
│   │   │       │   ├── 📄 by-source.d.mts
│   │   │       │   ├── 📄 by-source.d.mts.map
│   │   │       │   ├── 📄 flatten-map.d.cts
│   │   │       │   ├── 📄 flatten-map.d.cts.map
│   │   │       │   ├── 📄 flatten-map.d.mts
│   │   │       │   ├── 📄 flatten-map.d.mts.map
│   │   │       │   ├── 📄 resolve.d.cts
│   │   │       │   ├── 📄 resolve.d.cts.map
│   │   │       │   ├── 📄 resolve.d.mts
│   │   │       │   ├── 📄 resolve.d.mts.map
│   │   │       │   ├── 📄 sort.d.cts
│   │   │       │   ├── 📄 sort.d.cts.map
│   │   │       │   ├── 📄 sort.d.mts
│   │   │       │   ├── 📄 sort.d.mts.map
│   │   │       │   ├── 📄 sourcemap-segment.d.cts
│   │   │       │   ├── 📄 sourcemap-segment.d.cts.map
│   │   │       │   ├── 📄 sourcemap-segment.d.mts
│   │   │       │   ├── 📄 sourcemap-segment.d.mts.map
│   │   │       │   ├── 📄 strip-filename.d.cts
│   │   │       │   ├── 📄 strip-filename.d.cts.map
│   │   │       │   ├── 📄 strip-filename.d.mts
│   │   │       │   ├── 📄 strip-filename.d.mts.map
│   │   │       │   ├── 📄 trace-mapping.d.cts
│   │   │       │   ├── 📄 trace-mapping.d.cts.map
│   │   │       │   ├── 📄 trace-mapping.d.mts
│   │   │       │   ├── 📄 trace-mapping.d.mts.map
│   │   │       │   ├── 📄 types.d.cts
│   │   │       │   ├── 📄 types.d.cts.map
│   │   │       │   ├── 📄 types.d.mts
│   │   │       │   └── 📄 types.d.mts.map
│   │   │       ├── 📄 LICENSE
│   │   │       ├── 📋 package.json
│   │   │       └── 📝 README.md
│   │   ├── 📁 @remix-run/
│   │   │   └── 📁 router/
│   │   │       ├── 📁 dist/
│   │   │       │   ├── 📄 history.d.ts
│   │   │       │   ├── 📄 index.d.ts
│   │   │       │   ├── 🟨 router.cjs.js
│   │   │       │   ├── 📄 router.cjs.js.map
│   │   │       │   ├── 📄 router.d.ts
│   │   │       │   ├── 🟨 router.js
│   │   │       │   ├── 📄 router.js.map
│   │   │       │   ├── 🟨 router.umd.js
│   │   │       │   ├── 📄 router.umd.js.map
│   │   │       │   ├── 🟨 router.umd.min.js
│   │   │       │   ├── 📄 router.umd.min.js.map
│   │   │       │   └── 📄 utils.d.ts
│   │   │       ├── 📝 CHANGELOG.md
│   │   │       ├── 📄 history.ts
│   │   │       ├── 📄 index.ts
│   │   │       ├── 📝 LICENSE.md
│   │   │       ├── 📋 package.json
│   │   │       ├── 📝 README.md
│   │   │       ├── 📄 router.ts
│   │   │       └── 📄 utils.ts
│   │   ├── 📁 @rolldown/
│   │   │   └── 📁 pluginutils/
│   │   │       ├── 📁 dist/
│   │   │       │   ├── 📄 index.cjs
│   │   │       │   ├── 📄 index.d.cts
│   │   │       │   ├── 📄 index.d.ts
│   │   │       │   └── 🟨 index.js
│   │   │       ├── 📄 LICENSE
│   │   │       └── 📋 package.json
│   │   ├── 📁 @rollup/
│   │   │   ├── 📁 rollup-win32-x64-gnu/
│   │   │   │   ├── 📋 package.json
│   │   │   │   ├── 📝 README.md
│   │   │   │   └── 📄 rollup.win32-x64-gnu.node
│   │   │   └── 📁 rollup-win32-x64-msvc/
│   │   │       ├── 📋 package.json
│   │   │       ├── 📝 README.md
│   │   │       └── 📄 rollup.win32-x64-msvc.node
│   │   ├── 📁 @types/
│   │   │   ├── 📁 babel__core/
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 babel__generator/
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 babel__template/
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   ├── 📁 babel__traverse/
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 📄 LICENSE
│   │   │   │   ├── 📋 package.json
│   │   │   │   └── 📝 README.md
│   │   │   └── 📁 estree/
│   │   │       ├── 📄 flow.d.ts
│   │   │       ├── 📄 index.d.ts
│   │   │       ├── 📄 LICENSE
│   │   │       ├── 📋 package.json
│   │   │       └── 📝 README.md
│   │   ├── 📁 @vitejs/
│   │   │   └── 📁 plugin-react/
│   │   │       ├── 📁 dist/
│   │   │       │   ├── 📄 index.cjs
│   │   │       │   ├── 📄 index.d.cts
│   │   │       │   ├── 📄 index.d.ts
│   │   │       │   ├── 🟨 index.js
│   │   │       │   └── 🟨 refresh-runtime.js
│   │   │       ├── 📄 LICENSE
│   │   │       ├── 📋 package.json
│   │   │       └── 📝 README.md
│   │   ├── 📁 asynckit/
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 🟨 abort.js
│   │   │   │   ├── 🟨 async.js
│   │   │   │   ├── 🟨 defer.js
│   │   │   │   ├── 🟨 iterate.js
│   │   │   │   ├── 🟨 readable_asynckit.js
│   │   │   │   ├── 🟨 readable_parallel.js
│   │   │   │   ├── 🟨 readable_serial_ordered.js
│   │   │   │   ├── 🟨 readable_serial.js
│   │   │   │   ├── 🟨 state.js
│   │   │   │   ├── 🟨 streamify.js
│   │   │   │   └── 🟨 terminator.js
│   │   │   ├── 🟨 bench.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 🟨 parallel.js
│   │   │   ├── 📝 README.md
│   │   │   ├── 🟨 serial.js
│   │   │   ├── 🟨 serialOrdered.js
│   │   │   └── 🟨 stream.js
│   │   ├── 📁 axios/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 📁 browser/
│   │   │   │   │   ├── 📄 axios.cjs
│   │   │   │   │   └── 📄 axios.cjs.map
│   │   │   │   ├── 📁 esm/
│   │   │   │   │   ├── 🟨 axios.js
│   │   │   │   │   ├── 📄 axios.js.map
│   │   │   │   │   ├── 🟨 axios.min.js
│   │   │   │   │   └── 📄 axios.min.js.map
│   │   │   │   ├── 📁 node/
│   │   │   │   │   ├── 📄 axios.cjs
│   │   │   │   │   └── 📄 axios.cjs.map
│   │   │   │   ├── 🟨 axios.js
│   │   │   │   ├── 📄 axios.js.map
│   │   │   │   ├── 🟨 axios.min.js
│   │   │   │   └── 📄 axios.min.js.map
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 📁 adapters/
│   │   │   │   │   ├── 🟨 adapters.js
│   │   │   │   │   ├── 🟨 fetch.js
│   │   │   │   │   ├── 🟨 http.js
│   │   │   │   │   ├── 📝 README.md
│   │   │   │   │   └── 🟨 xhr.js
│   │   │   │   ├── 📁 cancel/
│   │   │   │   │   ├── 🟨 CanceledError.js
│   │   │   │   │   ├── 🟨 CancelToken.js
│   │   │   │   │   └── 🟨 isCancel.js
│   │   │   │   ├── 📁 core/
│   │   │   │   │   ├── 🟨 Axios.js
│   │   │   │   │   ├── 🟨 AxiosError.js
│   │   │   │   │   ├── 🟨 AxiosHeaders.js
│   │   │   │   │   ├── 🟨 buildFullPath.js
│   │   │   │   │   ├── 🟨 dispatchRequest.js
│   │   │   │   │   ├── 🟨 InterceptorManager.js
│   │   │   │   │   ├── 🟨 mergeConfig.js
│   │   │   │   │   ├── 📝 README.md
│   │   │   │   │   ├── 🟨 settle.js
│   │   │   │   │   └── 🟨 transformData.js
│   │   │   │   ├── 📁 defaults/
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 🟨 transitional.js
│   │   │   │   ├── 📁 env/
│   │   │   │   │   ├── 📁 classes/
│   │   │   │   │   │   └── 🟨 FormData.js
│   │   │   │   │   ├── 🟨 data.js
│   │   │   │   │   └── 📝 README.md
│   │   │   │   ├── 📁 helpers/
│   │   │   │   │   ├── 🟨 AxiosTransformStream.js
│   │   │   │   │   ├── 🟨 AxiosURLSearchParams.js
│   │   │   │   │   ├── 🟨 bind.js
│   │   │   │   │   ├── 🟨 buildURL.js
│   │   │   │   │   ├── 🟨 callbackify.js
│   │   │   │   │   ├── 🟨 combineURLs.js
│   │   │   │   │   ├── 🟨 composeSignals.js
│   │   │   │   │   ├── 🟨 cookies.js
│   │   │   │   │   ├── 🟨 deprecatedMethod.js
│   │   │   │   │   ├── 🟨 estimateDataURLDecodedBytes.js
│   │   │   │   │   ├── 🟨 formDataToJSON.js
│   │   │   │   │   ├── 🟨 formDataToStream.js
│   │   │   │   │   ├── 🟨 fromDataURI.js
│   │   │   │   │   ├── 🟨 HttpStatusCode.js
│   │   │   │   │   ├── 🟨 isAbsoluteURL.js
│   │   │   │   │   ├── 🟨 isAxiosError.js
│   │   │   │   │   ├── 🟨 isURLSameOrigin.js
│   │   │   │   │   ├── 🟨 null.js
│   │   │   │   │   ├── 🟨 parseHeaders.js
│   │   │   │   │   ├── 🟨 parseProtocol.js
│   │   │   │   │   ├── 🟨 progressEventReducer.js
│   │   │   │   │   ├── 🟨 readBlob.js
│   │   │   │   │   ├── 📝 README.md
│   │   │   │   │   ├── 🟨 resolveConfig.js
│   │   │   │   │   ├── 🟨 speedometer.js
│   │   │   │   │   ├── 🟨 spread.js
│   │   │   │   │   ├── 🟨 throttle.js
│   │   │   │   │   ├── 🟨 toFormData.js
│   │   │   │   │   ├── 🟨 toURLEncodedForm.js
│   │   │   │   │   ├── 🟨 trackStream.js
│   │   │   │   │   ├── 🟨 validator.js
│   │   │   │   │   └── 🟨 ZlibHeaderTransformStream.js
│   │   │   │   ├── 📁 platform/
│   │   │   │   │   ├── 📁 browser/
│   │   │   │   │   │   ├── 📁 classes/
│   │   │   │   │   │   │   ├── 🟨 Blob.js
│   │   │   │   │   │   │   ├── 🟨 FormData.js
│   │   │   │   │   │   │   └── 🟨 URLSearchParams.js
│   │   │   │   │   │   └── 🟨 index.js
│   │   │   │   │   ├── 📁 common/
│   │   │   │   │   │   └── 🟨 utils.js
│   │   │   │   │   ├── 📁 node/
│   │   │   │   │   │   ├── 📁 classes/
│   │   │   │   │   │   │   ├── 🟨 FormData.js
│   │   │   │   │   │   │   └── 🟨 URLSearchParams.js
│   │   │   │   │   │   └── 🟨 index.js
│   │   │   │   │   └── 🟨 index.js
│   │   │   │   ├── 🟨 axios.js
│   │   │   │   └── 🟨 utils.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.cts
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📝 MIGRATION_GUIDE.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 baseline-browser-mapping/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 🟨 cli.js
│   │   │   │   ├── 📄 index.cjs
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📄 LICENSE.txt
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 browserslist/
│   │   │   ├── 🟨 browser.js
│   │   │   ├── 🟨 cli.js
│   │   │   ├── 📄 error.d.ts
│   │   │   ├── 🟨 error.js
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 🟨 node.js
│   │   │   ├── 📋 package.json
│   │   │   ├── 🟨 parse.js
│   │   │   └── 📝 README.md
│   │   ├── 📁 call-bind-apply-helpers/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📄 actualApply.d.ts
│   │   │   ├── 🟨 actualApply.js
│   │   │   ├── 📄 applyBind.d.ts
│   │   │   ├── 🟨 applyBind.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 functionApply.d.ts
│   │   │   ├── 🟨 functionApply.js
│   │   │   ├── 📄 functionCall.d.ts
│   │   │   ├── 🟨 functionCall.js
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 reflectApply.d.ts
│   │   │   ├── 🟨 reflectApply.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 caniuse-lite/
│   │   │   ├── 📁 data/
│   │   │   │   ├── 📁 features/
│   │   │   │   │   ├── 🟨 aac.js
│   │   │   │   │   ├── 🟨 abortcontroller.js
│   │   │   │   │   ├── 🟨 ac3-ec3.js
│   │   │   │   │   ├── 🟨 accelerometer.js
│   │   │   │   │   ├── 🟨 addeventlistener.js
│   │   │   │   │   ├── 🟨 alternate-stylesheet.js
│   │   │   │   │   ├── 🟨 ambient-light.js
│   │   │   │   │   ├── 🟨 apng.js
│   │   │   │   │   ├── 🟨 array-find-index.js
│   │   │   │   │   ├── 🟨 array-find.js
│   │   │   │   │   ├── 🟨 array-flat.js
│   │   │   │   │   ├── 🟨 array-includes.js
│   │   │   │   │   ├── 🟨 arrow-functions.js
│   │   │   │   │   ├── 🟨 asmjs.js
│   │   │   │   │   ├── 🟨 async-clipboard.js
│   │   │   │   │   ├── 🟨 async-functions.js
│   │   │   │   │   ├── 🟨 atob-btoa.js
│   │   │   │   │   ├── 🟨 audio-api.js
│   │   │   │   │   ├── 🟨 audio.js
│   │   │   │   │   ├── 🟨 audiotracks.js
│   │   │   │   │   ├── 🟨 autofocus.js
│   │   │   │   │   ├── 🟨 auxclick.js
│   │   │   │   │   ├── 🟨 av1.js
│   │   │   │   │   ├── 🟨 avif.js
│   │   │   │   │   ├── 🟨 background-attachment.js
│   │   │   │   │   ├── 🟨 background-clip-text.js
│   │   │   │   │   ├── 🟨 background-img-opts.js
│   │   │   │   │   ├── 🟨 background-position-x-y.js
│   │   │   │   │   ├── 🟨 background-repeat-round-space.js
│   │   │   │   │   ├── 🟨 background-sync.js
│   │   │   │   │   ├── 🟨 battery-status.js
│   │   │   │   │   ├── 🟨 beacon.js
│   │   │   │   │   ├── 🟨 beforeafterprint.js
│   │   │   │   │   ├── 🟨 bigint.js
│   │   │   │   │   ├── 🟨 blobbuilder.js
│   │   │   │   │   ├── 🟨 bloburls.js
│   │   │   │   │   ├── 🟨 border-image.js
│   │   │   │   │   ├── 🟨 border-radius.js
│   │   │   │   │   ├── 🟨 broadcastchannel.js
│   │   │   │   │   ├── 🟨 brotli.js
│   │   │   │   │   ├── 🟨 calc.js
│   │   │   │   │   ├── 🟨 canvas-blending.js
│   │   │   │   │   ├── 🟨 canvas-text.js
│   │   │   │   │   ├── 🟨 canvas.js
│   │   │   │   │   ├── 🟨 ch-unit.js
│   │   │   │   │   ├── 🟨 chacha20-poly1305.js
│   │   │   │   │   ├── 🟨 channel-messaging.js
│   │   │   │   │   ├── 🟨 childnode-remove.js
│   │   │   │   │   ├── 🟨 classlist.js
│   │   │   │   │   ├── 🟨 client-hints-dpr-width-viewport.js
│   │   │   │   │   ├── 🟨 clipboard.js
│   │   │   │   │   ├── 🟨 colr-v1.js
│   │   │   │   │   ├── 🟨 colr.js
│   │   │   │   │   ├── 🟨 comparedocumentposition.js
│   │   │   │   │   ├── 🟨 console-basic.js
│   │   │   │   │   ├── 🟨 console-time.js
│   │   │   │   │   ├── 🟨 const.js
│   │   │   │   │   ├── 🟨 constraint-validation.js
│   │   │   │   │   ├── 🟨 contenteditable.js
│   │   │   │   │   ├── 🟨 contentsecuritypolicy.js
│   │   │   │   │   ├── 🟨 contentsecuritypolicy2.js
│   │   │   │   │   ├── 🟨 cookie-store-api.js
│   │   │   │   │   ├── 🟨 cors.js
│   │   │   │   │   ├── 🟨 createimagebitmap.js
│   │   │   │   │   ├── 🟨 credential-management.js
│   │   │   │   │   ├── 🟨 cross-document-view-transitions.js
│   │   │   │   │   ├── 🟨 cryptography.js
│   │   │   │   │   ├── 🟨 css-all.js
│   │   │   │   │   ├── 🟨 css-anchor-positioning.js
│   │   │   │   │   ├── 🟨 css-animation.js
│   │   │   │   │   ├── 🟨 css-any-link.js
│   │   │   │   │   ├── 🟨 css-appearance.js
│   │   │   │   │   ├── 🟨 css-at-counter-style.js
│   │   │   │   │   ├── 🟨 css-autofill.js
│   │   │   │   │   ├── 🟨 css-backdrop-filter.js
│   │   │   │   │   ├── 🟨 css-background-offsets.js
│   │   │   │   │   ├── 🟨 css-backgroundblendmode.js
│   │   │   │   │   ├── 🟨 css-boxdecorationbreak.js
│   │   │   │   │   ├── 🟨 css-boxshadow.js
│   │   │   │   │   ├── 🟨 css-canvas.js
│   │   │   │   │   ├── 🟨 css-caret-color.js
│   │   │   │   │   ├── 🟨 css-cascade-layers.js
│   │   │   │   │   ├── 🟨 css-cascade-scope.js
│   │   │   │   │   ├── 🟨 css-case-insensitive.js
│   │   │   │   │   ├── 🟨 css-clip-path.js
│   │   │   │   │   ├── 🟨 css-color-adjust.js
│   │   │   │   │   ├── 🟨 css-color-function.js
│   │   │   │   │   ├── 🟨 css-conic-gradients.js
│   │   │   │   │   ├── 🟨 css-container-queries-style.js
│   │   │   │   │   ├── 🟨 css-container-queries.js
│   │   │   │   │   ├── 🟨 css-container-query-units.js
│   │   │   │   │   ├── 🟨 css-containment.js
│   │   │   │   │   ├── 🟨 css-content-visibility.js
│   │   │   │   │   ├── 🟨 css-counters.js
│   │   │   │   │   ├── 🟨 css-crisp-edges.js
│   │   │   │   │   ├── 🟨 css-cross-fade.js
│   │   │   │   │   ├── 🟨 css-default-pseudo.js
│   │   │   │   │   ├── 🟨 css-descendant-gtgt.js
│   │   │   │   │   ├── 🟨 css-deviceadaptation.js
│   │   │   │   │   ├── 🟨 css-dir-pseudo.js
│   │   │   │   │   ├── 🟨 css-display-contents.js
│   │   │   │   │   ├── 🟨 css-element-function.js
│   │   │   │   │   ├── 🟨 css-env-function.js
│   │   │   │   │   ├── 🟨 css-exclusions.js
│   │   │   │   │   ├── 🟨 css-featurequeries.js
│   │   │   │   │   ├── 🟨 css-file-selector-button.js
│   │   │   │   │   ├── 🟨 css-filter-function.js
│   │   │   │   │   ├── 🟨 css-filters.js
│   │   │   │   │   ├── 🟨 css-first-letter.js
│   │   │   │   │   ├── 🟨 css-first-line.js
│   │   │   │   │   ├── 🟨 css-fixed.js
│   │   │   │   │   ├── 🟨 css-focus-visible.js
│   │   │   │   │   ├── 🟨 css-focus-within.js
│   │   │   │   │   ├── 🟨 css-font-palette.js
│   │   │   │   │   ├── 🟨 css-font-rendering-controls.js
│   │   │   │   │   ├── 🟨 css-font-stretch.js
│   │   │   │   │   ├── 🟨 css-gencontent.js
│   │   │   │   │   ├── 🟨 css-gradients.js
│   │   │   │   │   ├── 🟨 css-grid-animation.js
│   │   │   │   │   ├── 🟨 css-grid.js
│   │   │   │   │   ├── 🟨 css-hanging-punctuation.js
│   │   │   │   │   ├── 🟨 css-has.js
│   │   │   │   │   ├── 🟨 css-hyphens.js
│   │   │   │   │   ├── 🟨 css-if.js
│   │   │   │   │   ├── 🟨 css-image-orientation.js
│   │   │   │   │   ├── 🟨 css-image-set.js
│   │   │   │   │   ├── 🟨 css-in-out-of-range.js
│   │   │   │   │   ├── 🟨 css-indeterminate-pseudo.js
│   │   │   │   │   ├── 🟨 css-initial-letter.js
│   │   │   │   │   ├── 🟨 css-initial-value.js
│   │   │   │   │   ├── 🟨 css-lch-lab.js
│   │   │   │   │   ├── 🟨 css-letter-spacing.js
│   │   │   │   │   ├── 🟨 css-line-clamp.js
│   │   │   │   │   ├── 🟨 css-logical-props.js
│   │   │   │   │   ├── 🟨 css-marker-pseudo.js
│   │   │   │   │   ├── 🟨 css-masks.js
│   │   │   │   │   ├── 🟨 css-matches-pseudo.js
│   │   │   │   │   ├── 🟨 css-math-functions.js
│   │   │   │   │   ├── 🟨 css-media-interaction.js
│   │   │   │   │   ├── 🟨 css-media-range-syntax.js
│   │   │   │   │   ├── 🟨 css-media-resolution.js
│   │   │   │   │   ├── 🟨 css-media-scripting.js
│   │   │   │   │   ├── 🟨 css-mediaqueries.js
│   │   │   │   │   ├── 🟨 css-mixblendmode.js
│   │   │   │   │   ├── 🟨 css-module-scripts.js
│   │   │   │   │   ├── 🟨 css-motion-paths.js
│   │   │   │   │   ├── 🟨 css-namespaces.js
│   │   │   │   │   ├── 🟨 css-nesting.js
│   │   │   │   │   ├── 🟨 css-not-sel-list.js
│   │   │   │   │   ├── 🟨 css-nth-child-of.js
│   │   │   │   │   ├── 🟨 css-opacity.js
│   │   │   │   │   ├── 🟨 css-optional-pseudo.js
│   │   │   │   │   ├── 🟨 css-overflow-anchor.js
│   │   │   │   │   ├── 🟨 css-overflow-overlay.js
│   │   │   │   │   ├── 🟨 css-overflow.js
│   │   │   │   │   ├── 🟨 css-overscroll-behavior.js
│   │   │   │   │   ├── 🟨 css-page-break.js
│   │   │   │   │   ├── 🟨 css-paged-media.js
│   │   │   │   │   ├── 🟨 css-paint-api.js
│   │   │   │   │   ├── 🟨 css-placeholder-shown.js
│   │   │   │   │   ├── 🟨 css-placeholder.js
│   │   │   │   │   ├── 🟨 css-print-color-adjust.js
│   │   │   │   │   ├── 🟨 css-read-only-write.js
│   │   │   │   │   ├── 🟨 css-rebeccapurple.js
│   │   │   │   │   ├── 🟨 css-reflections.js
│   │   │   │   │   ├── 🟨 css-regions.js
│   │   │   │   │   ├── 🟨 css-relative-colors.js
│   │   │   │   │   ├── 🟨 css-repeating-gradients.js
│   │   │   │   │   ├── 🟨 css-resize.js
│   │   │   │   │   ├── 🟨 css-revert-value.js
│   │   │   │   │   ├── 🟨 css-rrggbbaa.js
│   │   │   │   │   ├── 🟨 css-scroll-behavior.js
│   │   │   │   │   ├── 🟨 css-scrollbar.js
│   │   │   │   │   ├── 🟨 css-sel2.js
│   │   │   │   │   ├── 🟨 css-sel3.js
│   │   │   │   │   ├── 🟨 css-selection.js
│   │   │   │   │   ├── 🟨 css-shapes.js
│   │   │   │   │   ├── 🟨 css-snappoints.js
│   │   │   │   │   ├── 🟨 css-sticky.js
│   │   │   │   │   ├── 🟨 css-subgrid.js
│   │   │   │   │   ├── 🟨 css-supports-api.js
│   │   │   │   │   ├── 🟨 css-table.js
│   │   │   │   │   ├── 🟨 css-text-align-last.js
│   │   │   │   │   ├── 🟨 css-text-box-trim.js
│   │   │   │   │   ├── 🟨 css-text-indent.js
│   │   │   │   │   ├── 🟨 css-text-justify.js
│   │   │   │   │   ├── 🟨 css-text-orientation.js
│   │   │   │   │   ├── 🟨 css-text-spacing.js
│   │   │   │   │   ├── 🟨 css-text-wrap-balance.js
│   │   │   │   │   ├── 🟨 css-textshadow.js
│   │   │   │   │   ├── 🟨 css-touch-action.js
│   │   │   │   │   ├── 🟨 css-transitions.js
│   │   │   │   │   ├── 🟨 css-unicode-bidi.js
│   │   │   │   │   ├── 🟨 css-unset-value.js
│   │   │   │   │   ├── 🟨 css-variables.js
│   │   │   │   │   ├── 🟨 css-when-else.js
│   │   │   │   │   ├── 🟨 css-widows-orphans.js
│   │   │   │   │   ├── 🟨 css-width-stretch.js
│   │   │   │   │   ├── 🟨 css-writing-mode.js
│   │   │   │   │   ├── 🟨 css-zoom.js
│   │   │   │   │   ├── 🟨 css3-attr.js
│   │   │   │   │   ├── 🟨 css3-boxsizing.js
│   │   │   │   │   ├── 🟨 css3-colors.js
│   │   │   │   │   ├── 🟨 css3-cursors-grab.js
│   │   │   │   │   ├── 🟨 css3-cursors-newer.js
│   │   │   │   │   ├── 🟨 css3-cursors.js
│   │   │   │   │   ├── 🟨 css3-tabsize.js
│   │   │   │   │   ├── 🟨 currentcolor.js
│   │   │   │   │   ├── 🟨 custom-elements.js
│   │   │   │   │   ├── 🟨 custom-elementsv1.js
│   │   │   │   │   ├── 🟨 customevent.js
│   │   │   │   │   ├── 🟨 datalist.js
│   │   │   │   │   ├── 🟨 dataset.js
│   │   │   │   │   ├── 🟨 datauri.js
│   │   │   │   │   ├── 🟨 date-tolocaledatestring.js
│   │   │   │   │   ├── 🟨 declarative-shadow-dom.js
│   │   │   │   │   ├── 🟨 decorators.js
│   │   │   │   │   ├── 🟨 details.js
│   │   │   │   │   ├── 🟨 deviceorientation.js
│   │   │   │   │   ├── 🟨 devicepixelratio.js
│   │   │   │   │   ├── 🟨 dialog.js
│   │   │   │   │   ├── 🟨 dispatchevent.js
│   │   │   │   │   ├── 🟨 dnssec.js
│   │   │   │   │   ├── 🟨 do-not-track.js
│   │   │   │   │   ├── 🟨 document-currentscript.js
│   │   │   │   │   ├── 🟨 document-evaluate-xpath.js
│   │   │   │   │   ├── 🟨 document-execcommand.js
│   │   │   │   │   ├── 🟨 document-policy.js
│   │   │   │   │   ├── 🟨 document-scrollingelement.js
│   │   │   │   │   ├── 🟨 documenthead.js
│   │   │   │   │   ├── 🟨 dom-manip-convenience.js
│   │   │   │   │   ├── 🟨 dom-range.js
│   │   │   │   │   ├── 🟨 domcontentloaded.js
│   │   │   │   │   ├── 🟨 dommatrix.js
│   │   │   │   │   ├── 🟨 download.js
│   │   │   │   │   ├── 🟨 dragndrop.js
│   │   │   │   │   ├── 🟨 element-closest.js
│   │   │   │   │   ├── 🟨 element-from-point.js
│   │   │   │   │   ├── 🟨 element-scroll-methods.js
│   │   │   │   │   ├── 🟨 eme.js
│   │   │   │   │   ├── 🟨 eot.js
│   │   │   │   │   ├── 🟨 es5.js
│   │   │   │   │   ├── 🟨 es6-class.js
│   │   │   │   │   ├── 🟨 es6-generators.js
│   │   │   │   │   ├── 🟨 es6-module-dynamic-import.js
│   │   │   │   │   ├── 🟨 es6-module.js
│   │   │   │   │   ├── 🟨 es6-number.js
│   │   │   │   │   ├── 🟨 es6-string-includes.js
│   │   │   │   │   ├── 🟨 es6.js
│   │   │   │   │   ├── 🟨 eventsource.js
│   │   │   │   │   ├── 🟨 extended-system-fonts.js
│   │   │   │   │   ├── 🟨 feature-policy.js
│   │   │   │   │   ├── 🟨 fetch.js
│   │   │   │   │   ├── 🟨 fieldset-disabled.js
│   │   │   │   │   ├── 🟨 fileapi.js
│   │   │   │   │   ├── 🟨 filereader.js
│   │   │   │   │   ├── 🟨 filereadersync.js
│   │   │   │   │   ├── 🟨 filesystem.js
│   │   │   │   │   ├── 🟨 flac.js
│   │   │   │   │   ├── 🟨 flexbox-gap.js
│   │   │   │   │   ├── 🟨 flexbox.js
│   │   │   │   │   ├── 🟨 flow-root.js
│   │   │   │   │   ├── 🟨 focusin-focusout-events.js
│   │   │   │   │   ├── 🟨 font-family-system-ui.js
│   │   │   │   │   ├── 🟨 font-feature.js
│   │   │   │   │   ├── 🟨 font-kerning.js
│   │   │   │   │   ├── 🟨 font-loading.js
│   │   │   │   │   ├── 🟨 font-size-adjust.js
│   │   │   │   │   ├── 🟨 font-smooth.js
│   │   │   │   │   ├── 🟨 font-unicode-range.js
│   │   │   │   │   ├── 🟨 font-variant-alternates.js
│   │   │   │   │   ├── 🟨 font-variant-numeric.js
│   │   │   │   │   ├── 🟨 fontface.js
│   │   │   │   │   ├── 🟨 form-attribute.js
│   │   │   │   │   ├── 🟨 form-submit-attributes.js
│   │   │   │   │   ├── 🟨 form-validation.js
│   │   │   │   │   ├── 🟨 forms.js
│   │   │   │   │   ├── 🟨 fullscreen.js
│   │   │   │   │   ├── 🟨 gamepad.js
│   │   │   │   │   ├── 🟨 geolocation.js
│   │   │   │   │   ├── 🟨 getboundingclientrect.js
│   │   │   │   │   ├── 🟨 getcomputedstyle.js
│   │   │   │   │   ├── 🟨 getelementsbyclassname.js
│   │   │   │   │   ├── 🟨 getrandomvalues.js
│   │   │   │   │   ├── 🟨 gyroscope.js
│   │   │   │   │   ├── 🟨 hardwareconcurrency.js
│   │   │   │   │   ├── 🟨 hashchange.js
│   │   │   │   │   ├── 🟨 heif.js
│   │   │   │   │   ├── 🟨 hevc.js
│   │   │   │   │   ├── 🟨 hidden.js
│   │   │   │   │   ├── 🟨 high-resolution-time.js
│   │   │   │   │   ├── 🟨 history.js
│   │   │   │   │   ├── 🟨 html-media-capture.js
│   │   │   │   │   ├── 🟨 html5semantic.js
│   │   │   │   │   ├── 🟨 http-live-streaming.js
│   │   │   │   │   ├── 🟨 http2.js
│   │   │   │   │   ├── 🟨 http3.js
│   │   │   │   │   ├── 🟨 iframe-sandbox.js
│   │   │   │   │   ├── 🟨 iframe-seamless.js
│   │   │   │   │   ├── 🟨 iframe-srcdoc.js
│   │   │   │   │   ├── 🟨 imagecapture.js
│   │   │   │   │   ├── 🟨 ime.js
│   │   │   │   │   ├── 🟨 img-naturalwidth-naturalheight.js
│   │   │   │   │   ├── 🟨 import-maps.js
│   │   │   │   │   ├── 🟨 imports.js
│   │   │   │   │   ├── 🟨 indeterminate-checkbox.js
│   │   │   │   │   ├── 🟨 indexeddb.js
│   │   │   │   │   ├── 🟨 indexeddb2.js
│   │   │   │   │   ├── 🟨 inline-block.js
│   │   │   │   │   ├── 🟨 innertext.js
│   │   │   │   │   ├── 🟨 input-autocomplete-onoff.js
│   │   │   │   │   ├── 🟨 input-color.js
│   │   │   │   │   ├── 🟨 input-datetime.js
│   │   │   │   │   ├── 🟨 input-email-tel-url.js
│   │   │   │   │   ├── 🟨 input-event.js
│   │   │   │   │   ├── 🟨 input-file-accept.js
│   │   │   │   │   ├── 🟨 input-file-directory.js
│   │   │   │   │   ├── 🟨 input-file-multiple.js
│   │   │   │   │   ├── 🟨 input-inputmode.js
│   │   │   │   │   ├── 🟨 input-minlength.js
│   │   │   │   │   ├── 🟨 input-number.js
│   │   │   │   │   ├── 🟨 input-pattern.js
│   │   │   │   │   ├── 🟨 input-placeholder.js
│   │   │   │   │   ├── 🟨 input-range.js
│   │   │   │   │   ├── 🟨 input-search.js
│   │   │   │   │   ├── 🟨 input-selection.js
│   │   │   │   │   ├── 🟨 insert-adjacent.js
│   │   │   │   │   ├── 🟨 insertadjacenthtml.js
│   │   │   │   │   ├── 🟨 internationalization.js
│   │   │   │   │   ├── 🟨 intersectionobserver-v2.js
│   │   │   │   │   ├── 🟨 intersectionobserver.js
│   │   │   │   │   ├── 🟨 intl-pluralrules.js
│   │   │   │   │   ├── 🟨 intrinsic-width.js
│   │   │   │   │   ├── 🟨 jpeg2000.js
│   │   │   │   │   ├── 🟨 jpegxl.js
│   │   │   │   │   ├── 🟨 jpegxr.js
│   │   │   │   │   ├── 🟨 js-regexp-lookbehind.js
│   │   │   │   │   ├── 🟨 json.js
│   │   │   │   │   ├── 🟨 justify-content-space-evenly.js
│   │   │   │   │   ├── 🟨 kerning-pairs-ligatures.js
│   │   │   │   │   ├── 🟨 keyboardevent-charcode.js
│   │   │   │   │   ├── 🟨 keyboardevent-code.js
│   │   │   │   │   ├── 🟨 keyboardevent-getmodifierstate.js
│   │   │   │   │   ├── 🟨 keyboardevent-key.js
│   │   │   │   │   ├── 🟨 keyboardevent-location.js
│   │   │   │   │   ├── 🟨 keyboardevent-which.js
│   │   │   │   │   ├── 🟨 lazyload.js
│   │   │   │   │   ├── 🟨 let.js
│   │   │   │   │   ├── 🟨 link-icon-png.js
│   │   │   │   │   ├── 🟨 link-icon-svg.js
│   │   │   │   │   ├── 🟨 link-rel-dns-prefetch.js
│   │   │   │   │   ├── 🟨 link-rel-modulepreload.js
│   │   │   │   │   ├── 🟨 link-rel-preconnect.js
│   │   │   │   │   ├── 🟨 link-rel-prefetch.js
│   │   │   │   │   ├── 🟨 link-rel-preload.js
│   │   │   │   │   ├── 🟨 link-rel-prerender.js
│   │   │   │   │   ├── 🟨 loading-lazy-attr.js
│   │   │   │   │   ├── 🟨 localecompare.js
│   │   │   │   │   ├── 🟨 magnetometer.js
│   │   │   │   │   ├── 🟨 matchesselector.js
│   │   │   │   │   ├── 🟨 matchmedia.js
│   │   │   │   │   ├── 🟨 mathml.js
│   │   │   │   │   ├── 🟨 maxlength.js
│   │   │   │   │   ├── 🟨 mdn-css-backdrop-pseudo-element.js
│   │   │   │   │   ├── 🟨 mdn-css-unicode-bidi-isolate-override.js
│   │   │   │   │   ├── 🟨 mdn-css-unicode-bidi-isolate.js
│   │   │   │   │   ├── 🟨 mdn-css-unicode-bidi-plaintext.js
│   │   │   │   │   ├── 🟨 mdn-text-decoration-color.js
│   │   │   │   │   ├── 🟨 mdn-text-decoration-line.js
│   │   │   │   │   ├── 🟨 mdn-text-decoration-shorthand.js
│   │   │   │   │   ├── 🟨 mdn-text-decoration-style.js
│   │   │   │   │   ├── 🟨 media-fragments.js
│   │   │   │   │   ├── 🟨 mediacapture-fromelement.js
│   │   │   │   │   ├── 🟨 mediarecorder.js
│   │   │   │   │   ├── 🟨 mediasource.js
│   │   │   │   │   ├── 🟨 menu.js
│   │   │   │   │   ├── 🟨 meta-theme-color.js
│   │   │   │   │   ├── 🟨 meter.js
│   │   │   │   │   ├── 🟨 midi.js
│   │   │   │   │   ├── 🟨 minmaxwh.js
│   │   │   │   │   ├── 🟨 mp3.js
│   │   │   │   │   ├── 🟨 mpeg-dash.js
│   │   │   │   │   ├── 🟨 mpeg4.js
│   │   │   │   │   ├── 🟨 multibackgrounds.js
│   │   │   │   │   ├── 🟨 multicolumn.js
│   │   │   │   │   ├── 🟨 mutation-events.js
│   │   │   │   │   ├── 🟨 mutationobserver.js
│   │   │   │   │   ├── 🟨 namevalue-storage.js
│   │   │   │   │   ├── 🟨 native-filesystem-api.js
│   │   │   │   │   ├── 🟨 nav-timing.js
│   │   │   │   │   ├── 🟨 netinfo.js
│   │   │   │   │   ├── 🟨 notifications.js
│   │   │   │   │   ├── 🟨 object-entries.js
│   │   │   │   │   ├── 🟨 object-fit.js
│   │   │   │   │   ├── 🟨 object-observe.js
│   │   │   │   │   ├── 🟨 object-values.js
│   │   │   │   │   ├── 🟨 objectrtc.js
│   │   │   │   │   ├── 🟨 offline-apps.js
│   │   │   │   │   ├── 🟨 offscreencanvas.js
│   │   │   │   │   ├── 🟨 ogg-vorbis.js
│   │   │   │   │   ├── 🟨 ogv.js
│   │   │   │   │   ├── 🟨 ol-reversed.js
│   │   │   │   │   ├── 🟨 once-event-listener.js
│   │   │   │   │   ├── 🟨 online-status.js
│   │   │   │   │   ├── 🟨 opus.js
│   │   │   │   │   ├── 🟨 orientation-sensor.js
│   │   │   │   │   ├── 🟨 outline.js
│   │   │   │   │   ├── 🟨 pad-start-end.js
│   │   │   │   │   ├── 🟨 page-transition-events.js
│   │   │   │   │   ├── 🟨 pagevisibility.js
│   │   │   │   │   ├── 🟨 passive-event-listener.js
│   │   │   │   │   ├── 🟨 passkeys.js
│   │   │   │   │   ├── 🟨 passwordrules.js
│   │   │   │   │   ├── 🟨 path2d.js
│   │   │   │   │   ├── 🟨 payment-request.js
│   │   │   │   │   ├── 🟨 pdf-viewer.js
│   │   │   │   │   ├── 🟨 permissions-api.js
│   │   │   │   │   ├── 🟨 permissions-policy.js
│   │   │   │   │   ├── 🟨 picture-in-picture.js
│   │   │   │   │   ├── 🟨 picture.js
│   │   │   │   │   ├── 🟨 ping.js
│   │   │   │   │   ├── 🟨 png-alpha.js
│   │   │   │   │   ├── 🟨 pointer-events.js
│   │   │   │   │   ├── 🟨 pointer.js
│   │   │   │   │   ├── 🟨 pointerlock.js
│   │   │   │   │   ├── 🟨 portals.js
│   │   │   │   │   ├── 🟨 prefers-color-scheme.js
│   │   │   │   │   ├── 🟨 prefers-reduced-motion.js
│   │   │   │   │   ├── 🟨 progress.js
│   │   │   │   │   ├── 🟨 promise-finally.js
│   │   │   │   │   ├── 🟨 promises.js
│   │   │   │   │   ├── 🟨 proximity.js
│   │   │   │   │   ├── 🟨 proxy.js
│   │   │   │   │   ├── 🟨 publickeypinning.js
│   │   │   │   │   ├── 🟨 push-api.js
│   │   │   │   │   ├── 🟨 queryselector.js
│   │   │   │   │   ├── 🟨 readonly-attr.js
│   │   │   │   │   ├── 🟨 referrer-policy.js
│   │   │   │   │   ├── 🟨 registerprotocolhandler.js
│   │   │   │   │   ├── 🟨 rel-noopener.js
│   │   │   │   │   ├── 🟨 rel-noreferrer.js
│   │   │   │   │   ├── 🟨 rellist.js
│   │   │   │   │   ├── 🟨 rem.js
│   │   │   │   │   ├── 🟨 requestanimationframe.js
│   │   │   │   │   ├── 🟨 requestidlecallback.js
│   │   │   │   │   ├── 🟨 resizeobserver.js
│   │   │   │   │   ├── 🟨 resource-timing.js
│   │   │   │   │   ├── 🟨 rest-parameters.js
│   │   │   │   │   ├── 🟨 rtcpeerconnection.js
│   │   │   │   │   ├── 🟨 ruby.js
│   │   │   │   │   ├── 🟨 run-in.js
│   │   │   │   │   ├── 🟨 same-site-cookie-attribute.js
│   │   │   │   │   ├── 🟨 screen-orientation.js
│   │   │   │   │   ├── 🟨 script-async.js
│   │   │   │   │   ├── 🟨 script-defer.js
│   │   │   │   │   ├── 🟨 scrollintoview.js
│   │   │   │   │   ├── 🟨 scrollintoviewifneeded.js
│   │   │   │   │   ├── 🟨 sdch.js
│   │   │   │   │   ├── 🟨 selection-api.js
│   │   │   │   │   ├── 🟨 selectlist.js
│   │   │   │   │   ├── 🟨 server-timing.js
│   │   │   │   │   ├── 🟨 serviceworkers.js
│   │   │   │   │   ├── 🟨 setimmediate.js
│   │   │   │   │   ├── 🟨 shadowdom.js
│   │   │   │   │   ├── 🟨 shadowdomv1.js
│   │   │   │   │   ├── 🟨 sharedarraybuffer.js
│   │   │   │   │   ├── 🟨 sharedworkers.js
│   │   │   │   │   ├── 🟨 sni.js
│   │   │   │   │   ├── 🟨 spdy.js
│   │   │   │   │   ├── 🟨 speech-recognition.js
│   │   │   │   │   ├── 🟨 speech-synthesis.js
│   │   │   │   │   ├── 🟨 spellcheck-attribute.js
│   │   │   │   │   ├── 🟨 sql-storage.js
│   │   │   │   │   ├── 🟨 srcset.js
│   │   │   │   │   ├── 🟨 stream.js
│   │   │   │   │   ├── 🟨 streams.js
│   │   │   │   │   ├── 🟨 stricttransportsecurity.js
│   │   │   │   │   ├── 🟨 style-scoped.js
│   │   │   │   │   ├── 🟨 subresource-bundling.js
│   │   │   │   │   ├── 🟨 subresource-integrity.js
│   │   │   │   │   ├── 🟨 svg-css.js
│   │   │   │   │   ├── 🟨 svg-filters.js
│   │   │   │   │   ├── 🟨 svg-fonts.js
│   │   │   │   │   ├── 🟨 svg-fragment.js
│   │   │   │   │   ├── 🟨 svg-html.js
│   │   │   │   │   ├── 🟨 svg-html5.js
│   │   │   │   │   ├── 🟨 svg-img.js
│   │   │   │   │   ├── 🟨 svg-smil.js
│   │   │   │   │   ├── 🟨 svg.js
│   │   │   │   │   ├── 🟨 sxg.js
│   │   │   │   │   ├── 🟨 tabindex-attr.js
│   │   │   │   │   ├── 🟨 template-literals.js
│   │   │   │   │   ├── 🟨 template.js
│   │   │   │   │   ├── 🟨 temporal.js
│   │   │   │   │   ├── 🟨 testfeat.js
│   │   │   │   │   ├── 🟨 text-decoration.js
│   │   │   │   │   ├── 🟨 text-emphasis.js
│   │   │   │   │   ├── 🟨 text-overflow.js
│   │   │   │   │   ├── 🟨 text-size-adjust.js
│   │   │   │   │   ├── 🟨 text-stroke.js
│   │   │   │   │   ├── 🟨 textcontent.js
│   │   │   │   │   ├── 🟨 textencoder.js
│   │   │   │   │   ├── 🟨 tls1-1.js
│   │   │   │   │   ├── 🟨 tls1-2.js
│   │   │   │   │   ├── 🟨 tls1-3.js
│   │   │   │   │   ├── 🟨 touch.js
│   │   │   │   │   ├── 🟨 transforms2d.js
│   │   │   │   │   ├── 🟨 transforms3d.js
│   │   │   │   │   ├── 🟨 trusted-types.js
│   │   │   │   │   ├── 🟨 ttf.js
│   │   │   │   │   ├── 🟨 typedarrays.js
│   │   │   │   │   ├── 🟨 u2f.js
│   │   │   │   │   ├── 🟨 unhandledrejection.js
│   │   │   │   │   ├── 🟨 upgradeinsecurerequests.js
│   │   │   │   │   ├── 🟨 url-scroll-to-text-fragment.js
│   │   │   │   │   ├── 🟨 url.js
│   │   │   │   │   ├── 🟨 urlsearchparams.js
│   │   │   │   │   ├── 🟨 use-strict.js
│   │   │   │   │   ├── 🟨 user-select-none.js
│   │   │   │   │   ├── 🟨 user-timing.js
│   │   │   │   │   ├── 🟨 variable-fonts.js
│   │   │   │   │   ├── 🟨 vector-effect.js
│   │   │   │   │   ├── 🟨 vibration.js
│   │   │   │   │   ├── 🟨 video.js
│   │   │   │   │   ├── 🟨 videotracks.js
│   │   │   │   │   ├── 🟨 view-transitions.js
│   │   │   │   │   ├── 🟨 viewport-unit-variants.js
│   │   │   │   │   ├── 🟨 viewport-units.js
│   │   │   │   │   ├── 🟨 wai-aria.js
│   │   │   │   │   ├── 🟨 wake-lock.js
│   │   │   │   │   ├── 🟨 wasm-bigint.js
│   │   │   │   │   ├── 🟨 wasm-bulk-memory.js
│   │   │   │   │   ├── 🟨 wasm-extended-const.js
│   │   │   │   │   ├── 🟨 wasm-gc.js
│   │   │   │   │   ├── 🟨 wasm-multi-memory.js
│   │   │   │   │   ├── 🟨 wasm-multi-value.js
│   │   │   │   │   ├── 🟨 wasm-mutable-globals.js
│   │   │   │   │   ├── 🟨 wasm-nontrapping-fptoint.js
│   │   │   │   │   ├── 🟨 wasm-reference-types.js
│   │   │   │   │   ├── 🟨 wasm-relaxed-simd.js
│   │   │   │   │   ├── 🟨 wasm-signext.js
│   │   │   │   │   ├── 🟨 wasm-simd.js
│   │   │   │   │   ├── 🟨 wasm-tail-calls.js
│   │   │   │   │   ├── 🟨 wasm-threads.js
│   │   │   │   │   ├── 🟨 wasm.js
│   │   │   │   │   ├── 🟨 wav.js
│   │   │   │   │   ├── 🟨 wbr-element.js
│   │   │   │   │   ├── 🟨 web-animation.js
│   │   │   │   │   ├── 🟨 web-app-manifest.js
│   │   │   │   │   ├── 🟨 web-bluetooth.js
│   │   │   │   │   ├── 🟨 web-serial.js
│   │   │   │   │   ├── 🟨 web-share.js
│   │   │   │   │   ├── 🟨 webauthn.js
│   │   │   │   │   ├── 🟨 webcodecs.js
│   │   │   │   │   ├── 🟨 webgl.js
│   │   │   │   │   ├── 🟨 webgl2.js
│   │   │   │   │   ├── 🟨 webgpu.js
│   │   │   │   │   ├── 🟨 webhid.js
│   │   │   │   │   ├── 🟨 webkit-user-drag.js
│   │   │   │   │   ├── 🟨 webm.js
│   │   │   │   │   ├── 🟨 webnfc.js
│   │   │   │   │   ├── 🟨 webp.js
│   │   │   │   │   ├── 🟨 websockets.js
│   │   │   │   │   ├── 🟨 webtransport.js
│   │   │   │   │   ├── 🟨 webusb.js
│   │   │   │   │   ├── 🟨 webvr.js
│   │   │   │   │   ├── 🟨 webvtt.js
│   │   │   │   │   ├── 🟨 webworkers.js
│   │   │   │   │   ├── 🟨 webxr.js
│   │   │   │   │   ├── 🟨 will-change.js
│   │   │   │   │   ├── 🟨 woff.js
│   │   │   │   │   ├── 🟨 woff2.js
│   │   │   │   │   ├── 🟨 word-break.js
│   │   │   │   │   ├── 🟨 wordwrap.js
│   │   │   │   │   ├── 🟨 x-doc-messaging.js
│   │   │   │   │   ├── 🟨 x-frame-options.js
│   │   │   │   │   ├── 🟨 xhr2.js
│   │   │   │   │   ├── 🟨 xhtml.js
│   │   │   │   │   ├── 🟨 xhtmlsmil.js
│   │   │   │   │   ├── 🟨 xml-serializer.js
│   │   │   │   │   └── 🟨 zstd.js
│   │   │   │   ├── 📁 regions/
│   │   │   │   │   ├── 🟨 AD.js
│   │   │   │   │   ├── 🟨 AE.js
│   │   │   │   │   ├── 🟨 AF.js
│   │   │   │   │   ├── 🟨 AG.js
│   │   │   │   │   ├── 🟨 AI.js
│   │   │   │   │   ├── 🟨 AL.js
│   │   │   │   │   ├── 🟨 alt-af.js
│   │   │   │   │   ├── 🟨 alt-an.js
│   │   │   │   │   ├── 🟨 alt-as.js
│   │   │   │   │   ├── 🟨 alt-eu.js
│   │   │   │   │   ├── 🟨 alt-na.js
│   │   │   │   │   ├── 🟨 alt-oc.js
│   │   │   │   │   ├── 🟨 alt-sa.js
│   │   │   │   │   ├── 🟨 alt-ww.js
│   │   │   │   │   ├── 🟨 AM.js
│   │   │   │   │   ├── 🟨 AO.js
│   │   │   │   │   ├── 🟨 AR.js
│   │   │   │   │   ├── 🟨 AS.js
│   │   │   │   │   ├── 🟨 AT.js
│   │   │   │   │   ├── 🟨 AU.js
│   │   │   │   │   ├── 🟨 AW.js
│   │   │   │   │   ├── 🟨 AX.js
│   │   │   │   │   ├── 🟨 AZ.js
│   │   │   │   │   ├── 🟨 BA.js
│   │   │   │   │   ├── 🟨 BB.js
│   │   │   │   │   ├── 🟨 BD.js
│   │   │   │   │   ├── 🟨 BE.js
│   │   │   │   │   ├── 🟨 BF.js
│   │   │   │   │   ├── 🟨 BG.js
│   │   │   │   │   ├── 🟨 BH.js
│   │   │   │   │   ├── 🟨 BI.js
│   │   │   │   │   ├── 🟨 BJ.js
│   │   │   │   │   ├── 🟨 BM.js
│   │   │   │   │   ├── 🟨 BN.js
│   │   │   │   │   ├── 🟨 BO.js
│   │   │   │   │   ├── 🟨 BR.js
│   │   │   │   │   ├── 🟨 BS.js
│   │   │   │   │   ├── 🟨 BT.js
│   │   │   │   │   ├── 🟨 BW.js
│   │   │   │   │   ├── 🟨 BY.js
│   │   │   │   │   ├── 🟨 BZ.js
│   │   │   │   │   ├── 🟨 CA.js
│   │   │   │   │   ├── 🟨 CD.js
│   │   │   │   │   ├── 🟨 CF.js
│   │   │   │   │   ├── 🟨 CG.js
│   │   │   │   │   ├── 🟨 CH.js
│   │   │   │   │   ├── 🟨 CI.js
│   │   │   │   │   ├── 🟨 CK.js
│   │   │   │   │   ├── 🟨 CL.js
│   │   │   │   │   ├── 🟨 CM.js
│   │   │   │   │   ├── 🟨 CN.js
│   │   │   │   │   ├── 🟨 CO.js
│   │   │   │   │   ├── 🟨 CR.js
│   │   │   │   │   ├── 🟨 CU.js
│   │   │   │   │   ├── 🟨 CV.js
│   │   │   │   │   ├── 🟨 CX.js
│   │   │   │   │   ├── 🟨 CY.js
│   │   │   │   │   ├── 🟨 CZ.js
│   │   │   │   │   ├── 🟨 DE.js
│   │   │   │   │   ├── 🟨 DJ.js
│   │   │   │   │   ├── 🟨 DK.js
│   │   │   │   │   ├── 🟨 DM.js
│   │   │   │   │   ├── 🟨 DO.js
│   │   │   │   │   ├── 🟨 DZ.js
│   │   │   │   │   ├── 🟨 EC.js
│   │   │   │   │   ├── 🟨 EE.js
│   │   │   │   │   ├── 🟨 EG.js
│   │   │   │   │   ├── 🟨 ER.js
│   │   │   │   │   ├── 🟨 ES.js
│   │   │   │   │   ├── 🟨 ET.js
│   │   │   │   │   ├── 🟨 FI.js
│   │   │   │   │   ├── 🟨 FJ.js
│   │   │   │   │   ├── 🟨 FK.js
│   │   │   │   │   ├── 🟨 FM.js
│   │   │   │   │   ├── 🟨 FO.js
│   │   │   │   │   ├── 🟨 FR.js
│   │   │   │   │   ├── 🟨 GA.js
│   │   │   │   │   ├── 🟨 GB.js
│   │   │   │   │   ├── 🟨 GD.js
│   │   │   │   │   ├── 🟨 GE.js
│   │   │   │   │   ├── 🟨 GF.js
│   │   │   │   │   ├── 🟨 GG.js
│   │   │   │   │   ├── 🟨 GH.js
│   │   │   │   │   ├── 🟨 GI.js
│   │   │   │   │   ├── 🟨 GL.js
│   │   │   │   │   ├── 🟨 GM.js
│   │   │   │   │   ├── 🟨 GN.js
│   │   │   │   │   ├── 🟨 GP.js
│   │   │   │   │   ├── 🟨 GQ.js
│   │   │   │   │   ├── 🟨 GR.js
│   │   │   │   │   ├── 🟨 GT.js
│   │   │   │   │   ├── 🟨 GU.js
│   │   │   │   │   ├── 🟨 GW.js
│   │   │   │   │   ├── 🟨 GY.js
│   │   │   │   │   ├── 🟨 HK.js
│   │   │   │   │   ├── 🟨 HN.js
│   │   │   │   │   ├── 🟨 HR.js
│   │   │   │   │   ├── 🟨 HT.js
│   │   │   │   │   ├── 🟨 HU.js
│   │   │   │   │   ├── 🟨 ID.js
│   │   │   │   │   ├── 🟨 IE.js
│   │   │   │   │   ├── 🟨 IL.js
│   │   │   │   │   ├── 🟨 IM.js
│   │   │   │   │   ├── 🟨 IN.js
│   │   │   │   │   ├── 🟨 IQ.js
│   │   │   │   │   ├── 🟨 IR.js
│   │   │   │   │   ├── 🟨 IS.js
│   │   │   │   │   ├── 🟨 IT.js
│   │   │   │   │   ├── 🟨 JE.js
│   │   │   │   │   ├── 🟨 JM.js
│   │   │   │   │   ├── 🟨 JO.js
│   │   │   │   │   ├── 🟨 JP.js
│   │   │   │   │   ├── 🟨 KE.js
│   │   │   │   │   ├── 🟨 KG.js
│   │   │   │   │   ├── 🟨 KH.js
│   │   │   │   │   ├── 🟨 KI.js
│   │   │   │   │   ├── 🟨 KM.js
│   │   │   │   │   ├── 🟨 KN.js
│   │   │   │   │   ├── 🟨 KP.js
│   │   │   │   │   ├── 🟨 KR.js
│   │   │   │   │   ├── 🟨 KW.js
│   │   │   │   │   ├── 🟨 KY.js
│   │   │   │   │   ├── 🟨 KZ.js
│   │   │   │   │   ├── 🟨 LA.js
│   │   │   │   │   ├── 🟨 LB.js
│   │   │   │   │   ├── 🟨 LC.js
│   │   │   │   │   ├── 🟨 LI.js
│   │   │   │   │   ├── 🟨 LK.js
│   │   │   │   │   ├── 🟨 LR.js
│   │   │   │   │   ├── 🟨 LS.js
│   │   │   │   │   ├── 🟨 LT.js
│   │   │   │   │   ├── 🟨 LU.js
│   │   │   │   │   ├── 🟨 LV.js
│   │   │   │   │   ├── 🟨 LY.js
│   │   │   │   │   ├── 🟨 MA.js
│   │   │   │   │   ├── 🟨 MC.js
│   │   │   │   │   ├── 🟨 MD.js
│   │   │   │   │   ├── 🟨 ME.js
│   │   │   │   │   ├── 🟨 MG.js
│   │   │   │   │   ├── 🟨 MH.js
│   │   │   │   │   ├── 🟨 MK.js
│   │   │   │   │   ├── 🟨 ML.js
│   │   │   │   │   ├── 🟨 MM.js
│   │   │   │   │   ├── 🟨 MN.js
│   │   │   │   │   ├── 🟨 MO.js
│   │   │   │   │   ├── 🟨 MP.js
│   │   │   │   │   ├── 🟨 MQ.js
│   │   │   │   │   ├── 🟨 MR.js
│   │   │   │   │   ├── 🟨 MS.js
│   │   │   │   │   ├── 🟨 MT.js
│   │   │   │   │   ├── 🟨 MU.js
│   │   │   │   │   ├── 🟨 MV.js
│   │   │   │   │   ├── 🟨 MW.js
│   │   │   │   │   ├── 🟨 MX.js
│   │   │   │   │   ├── 🟨 MY.js
│   │   │   │   │   ├── 🟨 MZ.js
│   │   │   │   │   ├── 🟨 NA.js
│   │   │   │   │   ├── 🟨 NC.js
│   │   │   │   │   ├── 🟨 NE.js
│   │   │   │   │   ├── 🟨 NF.js
│   │   │   │   │   ├── 🟨 NG.js
│   │   │   │   │   ├── 🟨 NI.js
│   │   │   │   │   ├── 🟨 NL.js
│   │   │   │   │   ├── 🟨 NO.js
│   │   │   │   │   ├── 🟨 NP.js
│   │   │   │   │   ├── 🟨 NR.js
│   │   │   │   │   ├── 🟨 NU.js
│   │   │   │   │   ├── 🟨 NZ.js
│   │   │   │   │   ├── 🟨 OM.js
│   │   │   │   │   ├── 🟨 PA.js
│   │   │   │   │   ├── 🟨 PE.js
│   │   │   │   │   ├── 🟨 PF.js
│   │   │   │   │   ├── 🟨 PG.js
│   │   │   │   │   ├── 🟨 PH.js
│   │   │   │   │   ├── 🟨 PK.js
│   │   │   │   │   ├── 🟨 PL.js
│   │   │   │   │   ├── 🟨 PM.js
│   │   │   │   │   ├── 🟨 PN.js
│   │   │   │   │   ├── 🟨 PR.js
│   │   │   │   │   ├── 🟨 PS.js
│   │   │   │   │   ├── 🟨 PT.js
│   │   │   │   │   ├── 🟨 PW.js
│   │   │   │   │   ├── 🟨 PY.js
│   │   │   │   │   ├── 🟨 QA.js
│   │   │   │   │   ├── 🟨 RE.js
│   │   │   │   │   ├── 🟨 RO.js
│   │   │   │   │   ├── 🟨 RS.js
│   │   │   │   │   ├── 🟨 RU.js
│   │   │   │   │   ├── 🟨 RW.js
│   │   │   │   │   ├── 🟨 SA.js
│   │   │   │   │   ├── 🟨 SB.js
│   │   │   │   │   ├── 🟨 SC.js
│   │   │   │   │   ├── 🟨 SD.js
│   │   │   │   │   ├── 🟨 SE.js
│   │   │   │   │   ├── 🟨 SG.js
│   │   │   │   │   ├── 🟨 SH.js
│   │   │   │   │   ├── 🟨 SI.js
│   │   │   │   │   ├── 🟨 SK.js
│   │   │   │   │   ├── 🟨 SL.js
│   │   │   │   │   ├── 🟨 SM.js
│   │   │   │   │   ├── 🟨 SN.js
│   │   │   │   │   ├── 🟨 SO.js
│   │   │   │   │   ├── 🟨 SR.js
│   │   │   │   │   ├── 🟨 ST.js
│   │   │   │   │   ├── 🟨 SV.js
│   │   │   │   │   ├── 🟨 SY.js
│   │   │   │   │   ├── 🟨 SZ.js
│   │   │   │   │   ├── 🟨 TC.js
│   │   │   │   │   ├── 🟨 TD.js
│   │   │   │   │   ├── 🟨 TG.js
│   │   │   │   │   ├── 🟨 TH.js
│   │   │   │   │   ├── 🟨 TJ.js
│   │   │   │   │   ├── 🟨 TL.js
│   │   │   │   │   ├── 🟨 TM.js
│   │   │   │   │   ├── 🟨 TN.js
│   │   │   │   │   ├── 🟨 TO.js
│   │   │   │   │   ├── 🟨 TR.js
│   │   │   │   │   ├── 🟨 TT.js
│   │   │   │   │   ├── 🟨 TV.js
│   │   │   │   │   ├── 🟨 TW.js
│   │   │   │   │   ├── 🟨 TZ.js
│   │   │   │   │   ├── 🟨 UA.js
│   │   │   │   │   ├── 🟨 UG.js
│   │   │   │   │   ├── 🟨 US.js
│   │   │   │   │   ├── 🟨 UY.js
│   │   │   │   │   ├── 🟨 UZ.js
│   │   │   │   │   ├── 🟨 VA.js
│   │   │   │   │   ├── 🟨 VC.js
│   │   │   │   │   ├── 🟨 VE.js
│   │   │   │   │   ├── 🟨 VG.js
│   │   │   │   │   ├── 🟨 VI.js
│   │   │   │   │   ├── 🟨 VN.js
│   │   │   │   │   ├── 🟨 VU.js
│   │   │   │   │   ├── 🟨 WF.js
│   │   │   │   │   ├── 🟨 WS.js
│   │   │   │   │   ├── 🟨 YE.js
│   │   │   │   │   ├── 🟨 YT.js
│   │   │   │   │   ├── 🟨 ZA.js
│   │   │   │   │   ├── 🟨 ZM.js
│   │   │   │   │   └── 🟨 ZW.js
│   │   │   │   ├── 🟨 agents.js
│   │   │   │   ├── 🟨 browsers.js
│   │   │   │   ├── 🟨 browserVersions.js
│   │   │   │   └── 🟨 features.js
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 🟨 statuses.js
│   │   │   │   │   └── 🟨 supported.js
│   │   │   │   └── 📁 unpacker/
│   │   │   │       ├── 🟨 agents.js
│   │   │   │       ├── 🟨 browsers.js
│   │   │   │       ├── 🟨 browserVersions.js
│   │   │   │       ├── 🟨 feature.js
│   │   │   │       ├── 🟨 features.js
│   │   │   │       ├── 🟨 index.js
│   │   │   │       └── 🟨 region.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 combined-stream/
│   │   │   ├── 📁 lib/
│   │   │   │   └── 🟨 combined_stream.js
│   │   │   ├── 📄 License
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 Readme.md
│   │   │   └── 📄 yarn.lock
│   │   ├── 📁 convert-source-map/
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 debug/
│   │   │   ├── 📁 src/
│   │   │   │   ├── 🟨 browser.js
│   │   │   │   ├── 🟨 common.js
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 🟨 node.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 delayed-stream/
│   │   │   ├── 📁 lib/
│   │   │   │   └── 🟨 delayed_stream.js
│   │   │   ├── 📄 License
│   │   │   ├── 📄 Makefile
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 Readme.md
│   │   ├── 📁 dunder-proto/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   ├── 🟨 get.js
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 🟨 set.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 get.d.ts
│   │   │   ├── 🟨 get.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 set.d.ts
│   │   │   ├── 🟨 set.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 electron-to-chromium/
│   │   │   ├── 🟨 chromium-versions.js
│   │   │   ├── 📋 chromium-versions.json
│   │   │   ├── 🟨 full-chromium-versions.js
│   │   │   ├── 📋 full-chromium-versions.json
│   │   │   ├── 🟨 full-versions.js
│   │   │   ├── 📋 full-versions.json
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 🟨 versions.js
│   │   │   └── 📋 versions.json
│   │   ├── 📁 es-define-property/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 es-errors/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 eval.d.ts
│   │   │   ├── 🟨 eval.js
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📄 range.d.ts
│   │   │   ├── 🟨 range.js
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 ref.d.ts
│   │   │   ├── 🟨 ref.js
│   │   │   ├── 📄 syntax.d.ts
│   │   │   ├── 🟨 syntax.js
│   │   │   ├── 📋 tsconfig.json
│   │   │   ├── 📄 type.d.ts
│   │   │   ├── 🟨 type.js
│   │   │   ├── 📄 uri.d.ts
│   │   │   └── 🟨 uri.js
│   │   ├── 📁 es-object-atoms/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 isObject.d.ts
│   │   │   ├── 🟨 isObject.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 RequireObjectCoercible.d.ts
│   │   │   ├── 🟨 RequireObjectCoercible.js
│   │   │   ├── 📄 ToObject.d.ts
│   │   │   ├── 🟨 ToObject.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 es-set-tostringtag/
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 esbuild/
│   │   │   ├── 📁 bin/
│   │   │   │   └── 📄 esbuild
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 📄 main.d.ts
│   │   │   │   └── 🟨 main.js
│   │   │   ├── 🟨 install.js
│   │   │   ├── 📝 LICENSE.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 escalade/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 📄 index.mjs
│   │   │   ├── 📁 sync/
│   │   │   │   ├── 📄 index.d.mts
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 📄 index.mjs
│   │   │   ├── 📄 index.d.mts
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 📄 license
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 readme.md
│   │   ├── 📁 follow-redirects/
│   │   │   ├── 🟨 debug.js
│   │   │   ├── 🟨 http.js
│   │   │   ├── 🟨 https.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 form-data/
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 🟨 browser.js
│   │   │   │   ├── 🟨 form_data.js
│   │   │   │   └── 🟨 populate.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 📄 License
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 function-bind/
│   │   │   ├── 📁 .github/
│   │   │   │   ├── 📄 FUNDING.yml
│   │   │   │   └── 📝 SECURITY.md
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 🟨 implementation.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 gensync/
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.test.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 index.js.flow
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 get-intrinsic/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 GetIntrinsic.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 get-proto/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📄 Object.getPrototypeOf.d.ts
│   │   │   ├── 🟨 Object.getPrototypeOf.js
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 Reflect.getPrototypeOf.d.ts
│   │   │   ├── 🟨 Reflect.getPrototypeOf.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 gopd/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 gOPD.d.ts
│   │   │   ├── 🟨 gOPD.js
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 has-symbols/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   ├── 📁 shams/
│   │   │   │   │   ├── 🟨 core-js.js
│   │   │   │   │   └── 🟨 get-own-property-symbols.js
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 🟨 tests.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 shams.d.ts
│   │   │   ├── 🟨 shams.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 has-tostringtag/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 test/
│   │   │   │   ├── 📁 shams/
│   │   │   │   │   ├── 🟨 core-js.js
│   │   │   │   │   └── 🟨 get-own-property-symbols.js
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 🟨 tests.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 shams.d.ts
│   │   │   ├── 🟨 shams.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 hasown/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 js-tokens/
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 jsesc/
│   │   │   ├── 📁 bin/
│   │   │   │   └── 📄 jsesc
│   │   │   ├── 📁 man/
│   │   │   │   └── 📄 jsesc.1
│   │   │   ├── 🟨 jsesc.js
│   │   │   ├── 📄 LICENSE-MIT.txt
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 json5/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 🟨 index.js
│   │   │   │   ├── 🟨 index.min.js
│   │   │   │   ├── 📄 index.min.mjs
│   │   │   │   └── 📄 index.mjs
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 🟨 cli.js
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 🟨 index.js
│   │   │   │   ├── 📄 parse.d.ts
│   │   │   │   ├── 🟨 parse.js
│   │   │   │   ├── 🟨 register.js
│   │   │   │   ├── 🟨 require.js
│   │   │   │   ├── 📄 stringify.d.ts
│   │   │   │   ├── 🟨 stringify.js
│   │   │   │   ├── 📄 unicode.d.ts
│   │   │   │   ├── 🟨 unicode.js
│   │   │   │   ├── 📄 util.d.ts
│   │   │   │   └── 🟨 util.js
│   │   │   ├── 📝 LICENSE.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 jwt-decode/
│   │   │   ├── 📁 build/
│   │   │   │   ├── 📁 cjs/
│   │   │   │   │   ├── 📄 index.d.ts
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   └── 📋 package.json
│   │   │   │   └── 📁 esm/
│   │   │   │       ├── 📄 index.d.ts
│   │   │   │       └── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 loose-envify/
│   │   │   ├── 🟨 cli.js
│   │   │   ├── 🟨 custom.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 🟨 loose-envify.js
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 🟨 replace.js
│   │   ├── 📁 lru-cache/
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 math-intrinsics/
│   │   │   ├── 📁 .github/
│   │   │   │   └── 📄 FUNDING.yml
│   │   │   ├── 📁 constants/
│   │   │   │   ├── 📄 maxArrayLength.d.ts
│   │   │   │   ├── 🟨 maxArrayLength.js
│   │   │   │   ├── 📄 maxSafeInteger.d.ts
│   │   │   │   ├── 🟨 maxSafeInteger.js
│   │   │   │   ├── 📄 maxValue.d.ts
│   │   │   │   └── 🟨 maxValue.js
│   │   │   ├── 📁 test/
│   │   │   │   └── 🟨 index.js
│   │   │   ├── 📄 abs.d.ts
│   │   │   ├── 🟨 abs.js
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📄 floor.d.ts
│   │   │   ├── 🟨 floor.js
│   │   │   ├── 📄 isFinite.d.ts
│   │   │   ├── 🟨 isFinite.js
│   │   │   ├── 📄 isInteger.d.ts
│   │   │   ├── 🟨 isInteger.js
│   │   │   ├── 📄 isNaN.d.ts
│   │   │   ├── 🟨 isNaN.js
│   │   │   ├── 📄 isNegativeZero.d.ts
│   │   │   ├── 🟨 isNegativeZero.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📄 max.d.ts
│   │   │   ├── 🟨 max.js
│   │   │   ├── 📄 min.d.ts
│   │   │   ├── 🟨 min.js
│   │   │   ├── 📄 mod.d.ts
│   │   │   ├── 🟨 mod.js
│   │   │   ├── 📋 package.json
│   │   │   ├── 📄 pow.d.ts
│   │   │   ├── 🟨 pow.js
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 round.d.ts
│   │   │   ├── 🟨 round.js
│   │   │   ├── 📄 sign.d.ts
│   │   │   ├── 🟨 sign.js
│   │   │   └── 📋 tsconfig.json
│   │   ├── 📁 mime-db/
│   │   │   ├── 📋 db.json
│   │   │   ├── 📝 HISTORY.md
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 mime-types/
│   │   │   ├── 📝 HISTORY.md
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 ms/
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📝 license.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 readme.md
│   │   ├── 📁 nanoid/
│   │   │   ├── 📁 async/
│   │   │   │   ├── 📄 index.browser.cjs
│   │   │   │   ├── 🟨 index.browser.js
│   │   │   │   ├── 📄 index.cjs
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 🟨 index.js
│   │   │   │   ├── 🟨 index.native.js
│   │   │   │   └── 📋 package.json
│   │   │   ├── 📁 bin/
│   │   │   │   └── 📄 nanoid.cjs
│   │   │   ├── 📁 non-secure/
│   │   │   │   ├── 📄 index.cjs
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 📋 package.json
│   │   │   ├── 📁 url-alphabet/
│   │   │   │   ├── 📄 index.cjs
│   │   │   │   ├── 🟨 index.js
│   │   │   │   └── 📋 package.json
│   │   │   ├── 📄 index.browser.cjs
│   │   │   ├── 🟨 index.browser.js
│   │   │   ├── 📄 index.cjs
│   │   │   ├── 📄 index.d.cts
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 🟨 nanoid.js
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 node-releases/
│   │   │   ├── 📁 data/
│   │   │   │   ├── 📁 processed/
│   │   │   │   │   └── 📋 envs.json
│   │   │   │   └── 📁 release-schedule/
│   │   │   │       └── 📋 release-schedule.json
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 picocolors/
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 🟨 picocolors.browser.js
│   │   │   ├── 📄 picocolors.d.ts
│   │   │   ├── 🟨 picocolors.js
│   │   │   ├── 📝 README.md
│   │   │   └── 📄 types.d.ts
│   │   ├── 📁 postcss/
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 📄 at-rule.d.ts
│   │   │   │   ├── 🟨 at-rule.js
│   │   │   │   ├── 📄 comment.d.ts
│   │   │   │   ├── 🟨 comment.js
│   │   │   │   ├── 📄 container.d.ts
│   │   │   │   ├── 🟨 container.js
│   │   │   │   ├── 📄 css-syntax-error.d.ts
│   │   │   │   ├── 🟨 css-syntax-error.js
│   │   │   │   ├── 📄 declaration.d.ts
│   │   │   │   ├── 🟨 declaration.js
│   │   │   │   ├── 📄 document.d.ts
│   │   │   │   ├── 🟨 document.js
│   │   │   │   ├── 📄 fromJSON.d.ts
│   │   │   │   ├── 🟨 fromJSON.js
│   │   │   │   ├── 📄 input.d.ts
│   │   │   │   ├── 🟨 input.js
│   │   │   │   ├── 📄 lazy-result.d.ts
│   │   │   │   ├── 🟨 lazy-result.js
│   │   │   │   ├── 📄 list.d.ts
│   │   │   │   ├── 🟨 list.js
│   │   │   │   ├── 🟨 map-generator.js
│   │   │   │   ├── 📄 no-work-result.d.ts
│   │   │   │   ├── 🟨 no-work-result.js
│   │   │   │   ├── 📄 node.d.ts
│   │   │   │   ├── 🟨 node.js
│   │   │   │   ├── 📄 parse.d.ts
│   │   │   │   ├── 🟨 parse.js
│   │   │   │   ├── 🟨 parser.js
│   │   │   │   ├── 📄 postcss.d.mts
│   │   │   │   ├── 📄 postcss.d.ts
│   │   │   │   ├── 🟨 postcss.js
│   │   │   │   ├── 📄 postcss.mjs
│   │   │   │   ├── 📄 previous-map.d.ts
│   │   │   │   ├── 🟨 previous-map.js
│   │   │   │   ├── 📄 processor.d.ts
│   │   │   │   ├── 🟨 processor.js
│   │   │   │   ├── 📄 result.d.ts
│   │   │   │   ├── 🟨 result.js
│   │   │   │   ├── 📄 root.d.ts
│   │   │   │   ├── 🟨 root.js
│   │   │   │   ├── 📄 rule.d.ts
│   │   │   │   ├── 🟨 rule.js
│   │   │   │   ├── 📄 stringifier.d.ts
│   │   │   │   ├── 🟨 stringifier.js
│   │   │   │   ├── 📄 stringify.d.ts
│   │   │   │   ├── 🟨 stringify.js
│   │   │   │   ├── 🟨 symbols.js
│   │   │   │   ├── 🟨 terminal-highlight.js
│   │   │   │   ├── 🟨 tokenize.js
│   │   │   │   ├── 🟨 warn-once.js
│   │   │   │   ├── 📄 warning.d.ts
│   │   │   │   └── 🟨 warning.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 proxy-from-env/
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 🟨 test.js
│   │   ├── 📁 react/
│   │   │   ├── 📁 cjs/
│   │   │   │   ├── 🟨 react-jsx-dev-runtime.development.js
│   │   │   │   ├── 🟨 react-jsx-dev-runtime.production.min.js
│   │   │   │   ├── 🟨 react-jsx-dev-runtime.profiling.min.js
│   │   │   │   ├── 🟨 react-jsx-runtime.development.js
│   │   │   │   ├── 🟨 react-jsx-runtime.production.min.js
│   │   │   │   ├── 🟨 react-jsx-runtime.profiling.min.js
│   │   │   │   ├── 🟨 react.development.js
│   │   │   │   ├── 🟨 react.production.min.js
│   │   │   │   ├── 🟨 react.shared-subset.development.js
│   │   │   │   └── 🟨 react.shared-subset.production.min.js
│   │   │   ├── 📁 umd/
│   │   │   │   ├── 🟨 react.development.js
│   │   │   │   ├── 🟨 react.production.min.js
│   │   │   │   └── 🟨 react.profiling.min.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 🟨 jsx-dev-runtime.js
│   │   │   ├── 🟨 jsx-runtime.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 🟨 react.shared-subset.js
│   │   │   └── 📝 README.md
│   │   ├── 📁 react-dom/
│   │   │   ├── 📁 cjs/
│   │   │   │   ├── 🟨 react-dom-server-legacy.browser.development.js
│   │   │   │   ├── 🟨 react-dom-server-legacy.browser.production.min.js
│   │   │   │   ├── 🟨 react-dom-server-legacy.node.development.js
│   │   │   │   ├── 🟨 react-dom-server-legacy.node.production.min.js
│   │   │   │   ├── 🟨 react-dom-server.browser.development.js
│   │   │   │   ├── 🟨 react-dom-server.browser.production.min.js
│   │   │   │   ├── 🟨 react-dom-server.node.development.js
│   │   │   │   ├── 🟨 react-dom-server.node.production.min.js
│   │   │   │   ├── 🟨 react-dom-test-utils.development.js
│   │   │   │   ├── 🟨 react-dom-test-utils.production.min.js
│   │   │   │   ├── 🟨 react-dom.development.js
│   │   │   │   ├── 🟨 react-dom.production.min.js
│   │   │   │   └── 🟨 react-dom.profiling.min.js
│   │   │   ├── 📁 umd/
│   │   │   │   ├── 🟨 react-dom-server-legacy.browser.development.js
│   │   │   │   ├── 🟨 react-dom-server-legacy.browser.production.min.js
│   │   │   │   ├── 🟨 react-dom-server.browser.development.js
│   │   │   │   ├── 🟨 react-dom-server.browser.production.min.js
│   │   │   │   ├── 🟨 react-dom-test-utils.development.js
│   │   │   │   ├── 🟨 react-dom-test-utils.production.min.js
│   │   │   │   ├── 🟨 react-dom.development.js
│   │   │   │   ├── 🟨 react-dom.production.min.js
│   │   │   │   └── 🟨 react-dom.profiling.min.js
│   │   │   ├── 🟨 client.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 🟨 profiling.js
│   │   │   ├── 📝 README.md
│   │   │   ├── 🟨 server.browser.js
│   │   │   ├── 🟨 server.js
│   │   │   ├── 🟨 server.node.js
│   │   │   └── 🟨 test-utils.js
│   │   ├── 📁 react-refresh/
│   │   │   ├── 📁 cjs/
│   │   │   │   ├── 🟨 react-refresh-babel.development.js
│   │   │   │   ├── 🟨 react-refresh-babel.production.js
│   │   │   │   ├── 🟨 react-refresh-runtime.development.js
│   │   │   │   └── 🟨 react-refresh-runtime.production.js
│   │   │   ├── 🟨 babel.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 🟨 runtime.js
│   │   ├── 📁 react-router/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 📁 lib/
│   │   │   │   │   ├── 📄 components.d.ts
│   │   │   │   │   ├── 📄 context.d.ts
│   │   │   │   │   ├── 📄 deprecations.d.ts
│   │   │   │   │   └── 📄 hooks.d.ts
│   │   │   │   ├── 📁 umd/
│   │   │   │   │   ├── 🟨 react-router.development.js
│   │   │   │   │   ├── 📄 react-router.development.js.map
│   │   │   │   │   ├── 🟨 react-router.production.min.js
│   │   │   │   │   └── 📄 react-router.production.min.js.map
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 🟨 index.js
│   │   │   │   ├── 📄 index.js.map
│   │   │   │   ├── 🟨 main.js
│   │   │   │   ├── 🟨 react-router.development.js
│   │   │   │   ├── 📄 react-router.development.js.map
│   │   │   │   ├── 🟨 react-router.production.min.js
│   │   │   │   └── 📄 react-router.production.min.js.map
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📝 LICENSE.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 react-router-dom/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 📁 umd/
│   │   │   │   │   ├── 🟨 react-router-dom.development.js
│   │   │   │   │   ├── 📄 react-router-dom.development.js.map
│   │   │   │   │   ├── 🟨 react-router-dom.production.min.js
│   │   │   │   │   └── 📄 react-router-dom.production.min.js.map
│   │   │   │   ├── 📄 dom.d.ts
│   │   │   │   ├── 📄 index.d.ts
│   │   │   │   ├── 🟨 index.js
│   │   │   │   ├── 📄 index.js.map
│   │   │   │   ├── 🟨 main.js
│   │   │   │   ├── 🟨 react-router-dom.development.js
│   │   │   │   ├── 📄 react-router-dom.development.js.map
│   │   │   │   ├── 🟨 react-router-dom.production.min.js
│   │   │   │   ├── 📄 react-router-dom.production.min.js.map
│   │   │   │   ├── 📄 server.d.ts
│   │   │   │   ├── 🟨 server.js
│   │   │   │   └── 📄 server.mjs
│   │   │   ├── 📝 CHANGELOG.md
│   │   │   ├── 📝 LICENSE.md
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 server.d.ts
│   │   │   ├── 🟨 server.js
│   │   │   └── 📄 server.mjs
│   │   ├── 📁 rollup/
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 📁 bin/
│   │   │   │   │   └── 📄 rollup
│   │   │   │   ├── 📁 es/
│   │   │   │   │   ├── 📁 shared/
│   │   │   │   │   │   ├── 🟨 node-entry.js
│   │   │   │   │   │   ├── 🟨 parseAst.js
│   │   │   │   │   │   └── 🟨 watch.js
│   │   │   │   │   ├── 🟨 getLogFilter.js
│   │   │   │   │   ├── 📋 package.json
│   │   │   │   │   ├── 🟨 parseAst.js
│   │   │   │   │   └── 🟨 rollup.js
│   │   │   │   ├── 📁 shared/
│   │   │   │   │   ├── 🟨 fsevents-importer.js
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 🟨 loadConfigFile.js
│   │   │   │   │   ├── 🟨 parseAst.js
│   │   │   │   │   ├── 🟨 rollup.js
│   │   │   │   │   ├── 🟨 watch-cli.js
│   │   │   │   │   └── 🟨 watch.js
│   │   │   │   ├── 📄 getLogFilter.d.ts
│   │   │   │   ├── 🟨 getLogFilter.js
│   │   │   │   ├── 📄 loadConfigFile.d.ts
│   │   │   │   ├── 🟨 loadConfigFile.js
│   │   │   │   ├── 🟨 native.js
│   │   │   │   ├── 📄 parseAst.d.ts
│   │   │   │   ├── 🟨 parseAst.js
│   │   │   │   ├── 📄 rollup.d.ts
│   │   │   │   └── 🟨 rollup.js
│   │   │   ├── 📝 LICENSE.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   ├── 📁 scheduler/
│   │   │   ├── 📁 cjs/
│   │   │   │   ├── 🟨 scheduler-unstable_mock.development.js
│   │   │   │   ├── 🟨 scheduler-unstable_mock.production.min.js
│   │   │   │   ├── 🟨 scheduler-unstable_post_task.development.js
│   │   │   │   ├── 🟨 scheduler-unstable_post_task.production.min.js
│   │   │   │   ├── 🟨 scheduler.development.js
│   │   │   │   └── 🟨 scheduler.production.min.js
│   │   │   ├── 📁 umd/
│   │   │   │   ├── 🟨 scheduler-unstable_mock.development.js
│   │   │   │   ├── 🟨 scheduler-unstable_mock.production.min.js
│   │   │   │   ├── 🟨 scheduler.development.js
│   │   │   │   ├── 🟨 scheduler.production.min.js
│   │   │   │   └── 🟨 scheduler.profiling.min.js
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 🟨 unstable_mock.js
│   │   │   └── 🟨 unstable_post_task.js
│   │   ├── 📁 semver/
│   │   │   ├── 📁 bin/
│   │   │   │   └── 🟨 semver.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📄 range.bnf
│   │   │   ├── 📝 README.md
│   │   │   └── 🟨 semver.js
│   │   ├── 📁 source-map-js/
│   │   │   ├── 📁 lib/
│   │   │   │   ├── 🟨 array-set.js
│   │   │   │   ├── 🟨 base64-vlq.js
│   │   │   │   ├── 🟨 base64.js
│   │   │   │   ├── 🟨 binary-search.js
│   │   │   │   ├── 🟨 mapping-list.js
│   │   │   │   ├── 🟨 quick-sort.js
│   │   │   │   ├── 📄 source-map-consumer.d.ts
│   │   │   │   ├── 🟨 source-map-consumer.js
│   │   │   │   ├── 📄 source-map-generator.d.ts
│   │   │   │   ├── 🟨 source-map-generator.js
│   │   │   │   ├── 📄 source-node.d.ts
│   │   │   │   ├── 🟨 source-node.js
│   │   │   │   └── 🟨 util.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   ├── 📄 source-map.d.ts
│   │   │   └── 🟨 source-map.js
│   │   ├── 📁 update-browserslist-db/
│   │   │   ├── 🟨 check-npm-version.js
│   │   │   ├── 🟨 cli.js
│   │   │   ├── 📄 index.d.ts
│   │   │   ├── 🟨 index.js
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📋 package.json
│   │   │   ├── 📝 README.md
│   │   │   └── 🟨 utils.js
│   │   ├── 📁 vite/
│   │   │   ├── 📁 bin/
│   │   │   │   ├── 📄 openChrome.applescript
│   │   │   │   └── 🟨 vite.js
│   │   │   ├── 📁 dist/
│   │   │   │   ├── 📁 client/
│   │   │   │   │   ├── 📄 client.mjs
│   │   │   │   │   └── 📄 env.mjs
│   │   │   │   ├── 📁 node/
│   │   │   │   │   ├── 📁 chunks/
│   │   │   │   │   │   ├── 🟨 dep-BB45zftN.js
│   │   │   │   │   │   ├── 🟨 dep-BK3b2jBa.js
│   │   │   │   │   │   ├── 🟨 dep-D-7KCb9p.js
│   │   │   │   │   │   ├── 🟨 dep-Dnp7gl8U.js
│   │   │   │   │   │   └── 🟨 dep-IQS-Za7F.js
│   │   │   │   │   ├── 🟨 cli.js
│   │   │   │   │   ├── 🟨 constants.js
│   │   │   │   │   ├── 📄 index.d.ts
│   │   │   │   │   ├── 🟨 index.js
│   │   │   │   │   ├── 📄 runtime.d.ts
│   │   │   │   │   ├── 🟨 runtime.js
│   │   │   │   │   └── 📄 types.d-aGj9QkWt.d.ts
│   │   │   │   └── 📁 node-cjs/
│   │   │   │       └── 📄 publicUtils.cjs
│   │   │   ├── 📁 types/
│   │   │   │   ├── 📄 customEvent.d.ts
│   │   │   │   ├── 📄 hmrPayload.d.ts
│   │   │   │   ├── 📄 hot.d.ts
│   │   │   │   ├── 📄 import-meta.d.ts
│   │   │   │   ├── 📄 importGlob.d.ts
│   │   │   │   ├── 📄 importMeta.d.ts
│   │   │   │   ├── 📄 metadata.d.ts
│   │   │   │   └── 📋 package.json
│   │   │   ├── 📄 client.d.ts
│   │   │   ├── 📄 index.cjs
│   │   │   ├── 📄 index.d.cts
│   │   │   ├── 📝 LICENSE.md
│   │   │   ├── 📋 package.json
│   │   │   └── 📝 README.md
│   │   └── 📁 yallist/
│   │       ├── 🟨 iterator.js
│   │       ├── 📄 LICENSE
│   │       ├── 📋 package.json
│   │       ├── 📝 README.md
│   │       └── 🟨 yallist.js
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📄 DriveSetup.jsx
│   │   │   ├── 📄 GoogleOAuthButton.jsx
│   │   │   └── 📄 ProtectedRoute.jsx
│   │   ├── 📁 contexts/
│   │   │   └── 📄 AuthContext.jsx
│   │   ├── 📁 pages/
│   │   │   ├── 📄 AuthCallback.jsx
│   │   │   ├── 📄 AuthError.jsx
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   ├── 📄 DriveSetup.jsx
│   │   │   └── 📄 Login.jsx
│   │   ├── 📁 services/
│   │   │   ├── 🟨 api.js
│   │   │   └── 🟨 auth.js
│   │   ├── 📁 utils/
│   │   │   └── 🟨 tokenManager.js
│   │   ├── 📄 App.jsx
│   │   └── 📄 index.jsx
│   ├── 🌐 index.html
│   ├── 📋 package-lock.json
│   ├── 📋 package.json
│   └── 🟨 vite.config.js
└── 📁 social-media-poster/
    ├── 📁 .git/
    │   ├── 📁 hooks/
    │   │   ├── 📄 applypatch-msg.sample
    │   │   ├── 📄 commit-msg.sample
    │   │   ├── 📄 fsmonitor-watchman.sample
    │   │   ├── 📄 post-update.sample
    │   │   ├── 📄 pre-applypatch.sample
    │   │   ├── 📄 pre-commit.sample
    │   │   ├── 📄 pre-merge-commit.sample
    │   │   ├── 📄 pre-push.sample
    │   │   ├── 📄 pre-rebase.sample
    │   │   ├── 📄 pre-receive.sample
    │   │   ├── 📄 prepare-commit-msg.sample
    │   │   ├── 📄 push-to-checkout.sample
    │   │   ├── 📄 sendemail-validate.sample
    │   │   └── 📄 update.sample
    │   ├── 📁 info/
    │   │   └── 📄 exclude
    │   ├── 📁 logs/
    │   │   ├── 📁 refs/
    │   │   │   ├── 📁 heads/
    │   │   │   │   └── 📄 main
    │   │   │   └── 📁 remotes/
    │   │   │       └── 📁 origin/
    │   │   │           ├── 📄 HEAD
    │   │   │           └── 📄 main
    │   │   └── 📄 HEAD
    │   ├── 📁 objects/
    │   │   ├── 📁 0f/
    │   │   │   └── 📄 0e92506a22e3757c36c0324579446756f99662
    │   │   ├── 📁 1a/
    │   │   │   └── 📄 c2af8ee22626dfaca7ecf0f7f719d0ebe2b305
    │   │   ├── 📁 1c/
    │   │   │   └── 📄 553e3b8bda10e874cce29acb03da6318318c4d
    │   │   ├── 📁 02/
    │   │   │   └── 📄 4d460e76c3f62c360cbd7edcbc407aa18ae42b
    │   │   ├── 📁 2a/
    │   │   │   └── 📄 b2b564178b5b95f60eb31fa8a90fcd5ce72bc3
    │   │   ├── 📁 2b/
    │   │   │   └── 📄 47a7fea1ea95006db2c0d6d6c072935c9ef7b5
    │   │   ├── 📁 2c/
    │   │   │   └── 📄 565e5a54f6a143fa8180af7aa1c1e25077c9ca
    │   │   ├── 📁 2f/
    │   │   │   └── 📄 e3f2833e1b554117ac9ec4eec4eaf7d59d114a
    │   │   ├── 📁 3b/
    │   │   │   └── 📄 c60d6dfe7e3481e4aa60d9fd07dab16fc7e4e0
    │   │   ├── 📁 3e/
    │   │   │   └── 📄 e1107e9d53f0b5d89ae5617ded85e2f387572c
    │   │   ├── 📁 4e/
    │   │   │   ├── 📄 efe2ed0f5fb086ed10ff75fa9eb0696199e41e
    │   │   │   └── 📄 f7de0dceb27d6f1d6a59a531a805827f665c57
    │   │   ├── 📁 5b/
    │   │   │   └── 📄 40e5500e484774e9413900811f96653e04fd52
    │   │   ├── 📁 5e/
    │   │   │   └── 📄 d3568630c4c72048688b1c88b791f32f1e9cf7
    │   │   ├── 📁 6a/
    │   │   │   └── 📄 a3cadb5f0cee0a038e8489ea2d638e797c9d2b
    │   │   ├── 📁 6b/
    │   │   │   └── 📄 e171ffb0b3e4878213feda0a96acce1dd61ac3
    │   │   ├── 📁 6d/
    │   │   │   └── 📄 47f85c9bc9c83cef7661228a66892f052ac159
    │   │   ├── 📁 07/
    │   │   │   └── 📄 fb2da2a67d3c95ec7d45245b3313888e8f09b9
    │   │   ├── 📁 08/
    │   │   │   └── 📄 75df23df4fdccdd07ea957d0b350d46c759478
    │   │   ├── 📁 8b/
    │   │   │   └── 📄 07742f87ba53c18438a7ba7b55f24f2bb85e99
    │   │   ├── 📁 09/
    │   │   │   └── 📄 a66d72d63a5023df8624bc0704b56ddc0659a1
    │   │   ├── 📁 9c/
    │   │   │   └── 📄 bab8e04e29a0e46934acfa3aaa221e052f2b00
    │   │   ├── 📁 9d/
    │   │   │   └── 📄 1dcfdaf1a6857c5f83dc27019c7600e1ffaff8
    │   │   ├── 📁 9e/
    │   │   │   └── 📄 9bdc8386cf552483b1d1d010f6f0585abbf8f9
    │   │   ├── 📁 9f/
    │   │   │   ├── 📄 a792ff62d5401f4242f155da6154fc6cc97bb6
    │   │   │   └── 📄 b693300448219b9dfe654f136724e175da632d
    │   │   ├── 📁 15/
    │   │   │   ├── 📄 6c1bf31261782e7157d3ec92da62a63c30ea49
    │   │   │   └── 📄 d123d9ed1a4c085dc3ef3f3164774dba52476b
    │   │   ├── 📁 20/
    │   │   │   └── 📄 1478508c4ff237cc5fc4c87397dd39d8819f56
    │   │   ├── 📁 22/
    │   │   │   └── 📄 4382cd022b2b2a80bb7120561f530e7b82001c
    │   │   ├── 📁 24/
    │   │   │   └── 📄 70320d26769111559cfb083979a95924f9e56f
    │   │   ├── 📁 27/
    │   │   │   └── 📄 3f0140d68da0926c304ba17341ea6fdc8a4b59
    │   │   ├── 📁 30/
    │   │   │   └── 📄 27c7ce232d025327b33b12ad7f6f6b421203e7
    │   │   ├── 📁 32/
    │   │   │   └── 📄 3162daa4828a771581c9a23a1d96e81f8fd2f3
    │   │   ├── 📁 33/
    │   │   │   └── 📄 475d4f58e844f410cce4f5e83ef7b068425d67
    │   │   ├── 📁 40/
    │   │   │   ├── 📄 3b7614d458e6ec07897c26e73c122bbda3c2e8
    │   │   │   └── 📄 ec5b64b7b6fbf0477f6d15ee6a2d48069b378d
    │   │   ├── 📁 42/
    │   │   │   └── 📄 bec23bc36dc4e9ffd67c43d374c656c19442d0
    │   │   ├── 📁 46/
    │   │   │   └── 📄 08c17dbaa6cd945012e6b082aa318eac90d24e
    │   │   ├── 📁 49/
    │   │   │   └── 📄 5d249d44d03872cdae62c58797163bf3398878
    │   │   ├── 📁 52/
    │   │   │   └── 📄 fa27d2e7e1a9c98d13ec86f1bff23daa1812e9
    │   │   ├── 📁 56/
    │   │   │   └── 📄 41723739877778c59638cc90786e9aff0ac017
    │   │   ├── 📁 61/
    │   │   │   └── 📄 585a38146e6faf7056b70752261ddfe189ad08
    │   │   ├── 📁 62/
    │   │   │   ├── 📄 c3d75db95f2698a62baec6f58258e14e5e4419
    │   │   │   └── 📄 cdc6fb1300f42e32b8ace042109baafa735951
    │   │   ├── 📁 65/
    │   │   │   ├── 📄 1e66d5670a565e9535b9a7783585e91532c47e
    │   │   │   └── 📄 f867437bcf813e1aab7ddbb90f8c66caf6867a
    │   │   ├── 📁 67/
    │   │   │   └── 📄 8295fddc527f54aea5603460e803d40f16f063
    │   │   ├── 📁 68/
    │   │   │   └── 📄 792eef0785eb1134f632e15bfbacc11e0cf33b
    │   │   ├── 📁 75/
    │   │   │   └── 📄 7c76a7a9804c4cf3ca5e30303e88c76390d868
    │   │   ├── 📁 76/
    │   │   │   └── 📄 fdd4c70bdbf5540d11654d419110ec12438cc7
    │   │   ├── 📁 84/
    │   │   │   └── 📄 73d9bf487ad5178fa430c36d513249368df2ba
    │   │   ├── 📁 93/
    │   │   │   └── 📄 135ceaf6d05026d11c72f113525afd3bcb0fd2
    │   │   ├── 📁 a2/
    │   │   │   └── 📄 fe7603b2be68940d3c3961a77de84da691a083
    │   │   ├── 📁 a6/
    │   │   │   └── 📄 9c7e90cb6380600a2da877abcadc9bfe1c3c67
    │   │   ├── 📁 a7/
    │   │   │   └── 📄 35c49d1727e9fdc616f4e97aad98474b752e6a
    │   │   ├── 📁 aa/
    │   │   │   └── 📄 c1c943903b59a69ecc076416fd09485fbaf307
    │   │   ├── 📁 b1/
    │   │   │   └── 📄 55d71117e18851c5666d6be0e9c97deaf826b9
    │   │   ├── 📁 b6/
    │   │   │   └── 📄 7a5f422c52b9376bffb4ad050ae03f88574cf6
    │   │   ├── 📁 bb/
    │   │   │   ├── 📄 b7e8be96a321dbabbea95096bb66e394d7086f
    │   │   │   └── 📄 f1ff7e6dbd85db3efeefd5b706de88cbafd974
    │   │   ├── 📁 bd/
    │   │   │   └── 📄 3ac320c9f181e48786295fb8e737005db0cb55
    │   │   ├── 📁 c0/
    │   │   │   ├── 📄 5e77f04cc64c0b8f1f77c2fa64974a037da3e2
    │   │   │   └── 📄 26caa00796ecac0a3a877d564eb5ba84f5ccb6
    │   │   ├── 📁 c5/
    │   │   │   ├── 📄 05dde476c9a1d7db3718a02ab324963d89a826
    │   │   │   └── 📄 62393dbea1deda778f6f3fbe2b7acf20a36a11
    │   │   ├── 📁 cb/
    │   │   │   └── 📄 2d457b3708ae55309318f764df2364aea5e70c
    │   │   ├── 📁 cf/
    │   │   │   └── 📄 1fe4407596c19d9f988cc0dbdf3f7f35cdedee
    │   │   ├── 📁 d6/
    │   │   │   ├── 📄 5e5d464aa2ed687afbd111790f849a18c65f48
    │   │   │   └── 📄 779fc84056bb048a3703f6f283b26593113f71
    │   │   ├── 📁 d9/
    │   │   │   └── 📄 8c6b2c38442beb9b5c757736df9144b3faebf4
    │   │   ├── 📁 de/
    │   │   │   ├── 📄 7638cfa3364f01d53e45811b8b00015eaecba7
    │   │   │   └── 📄 b80b86069870e904af8505542d894e9a07f5de
    │   │   ├── 📁 e2/
    │   │   │   └── 📄 3517d8eade015bb8545cc33402b4826c0ed28a
    │   │   ├── 📁 e4/
    │   │   │   └── 📄 0947e58fb20422dd3679ae2102abddb719d7b1
    │   │   ├── 📁 e6/
    │   │   │   ├── 📄 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
    │   │   │   └── 📄 25ed7d819b149df4b06f0ee84900b3c6db4e42
    │   │   ├── 📁 e7/
    │   │   │   └── 📄 bb018c228e4cb68ccf3c6856729c5e3b5b0edc
    │   │   ├── 📁 e8/
    │   │   │   ├── 📄 348b71389fb980f748c7286b22608022724ecc
    │   │   │   └── 📄 f74bac74ffc0aca11a233b7fe7d7f4b71d1716
    │   │   ├── 📁 e9/
    │   │   │   └── 📄 2ce2acbd51404ff454ffadfc9f6b609bddd046
    │   │   ├── 📁 ed/
    │   │   │   └── 📄 477f32d95f3006d8ad8e66764ceb2365e7d073
    │   │   ├── 📁 f1/
    │   │   │   └── 📄 63e35ee362a942bbbfedf97cce385e4d0a6920
    │   │   ├── 📁 f4/
    │   │   │   └── 📄 b32cd826613fa55e608a8e8ee7251e4ef1bbe6
    │   │   ├── 📁 f6/
    │   │   │   └── 📄 0535c196b2cc2a7c69c4aa5f1bf3d0b3a657c9
    │   │   ├── 📁 f9/
    │   │   │   └── 📄 b7710acf63c60fc9557f6b063de3b364e5b93c
    │   │   ├── 📁 fa/
    │   │   │   └── 📄 9ac635d8c2839964e7f68b2129656003d5d042
    │   │   ├── 📁 fb/
    │   │   │   └── 📄 99ea01541cf0731d1156d5641bfc499f7df798
    │   │   ├── 📁 ff/
    │   │   │   └── 📄 203eda415abf044ad93921096da06cb2cf63d0
    │   │   └── 📁 pack/
    │   │       ├── 📄 pack-03d8a6d7971dfac487ef084d130258219268a838.idx
    │   │       ├── 📄 pack-03d8a6d7971dfac487ef084d130258219268a838.pack
    │   │       └── 📄 pack-03d8a6d7971dfac487ef084d130258219268a838.rev
    │   ├── 📁 refs/
    │   │   ├── 📁 heads/
    │   │   │   └── 📄 main
    │   │   └── 📁 remotes/
    │   │       └── 📁 origin/
    │   │           ├── 📄 HEAD
    │   │           └── 📄 main
    │   ├── 📄 COMMIT_EDITMSG
    │   ├── 📄 config
    │   ├── 📄 description
    │   ├── 📄 HEAD
    │   ├── 📄 index
    │   └── 📄 packed-refs
    ├── 📁 backend/
    │   ├── 📁 alembic/
    │   │   ├── 📁 versions/
    │   │   │   └── 📄 004_add_app_config_table.py
    │   │   ├── 📄 env.py
    │   │   └── 📄 script.py.mako
    │   ├── 📁 app/
    │   │   ├── 📁 api/
    │   │   │   ├── 📄 auth_OLD.py
    │   │   │   ├── 📄 auth.py
    │   │   │   ├── 📄 customers.py
    │   │   │   ├── 📄 dependencies.py
    │   │   │   ├── 📄 drive.py
    │   │   │   ├── 📄 events.py
    │   │   │   └── 📄 photos.py
    │   │   ├── 📁 core/
    │   │   │   ├── 📄 config_OLD.py
    │   │   │   ├── 📄 config_oldV1.py
    │   │   │   ├── 📄 config.py
    │   │   │   ├── 📄 database.py
    │   │   │   ├── 📄 jwt_utils.py
    │   │   │   ├── 📄 oauth_config_OLD.py
    │   │   │   └── 📄 oauth_config.py
    │   │   ├── 📁 models/
    │   │   │   ├── 📄 config.py
    │   │   │   ├── 📄 customer.py
    │   │   │   ├── 📄 event_OLD.py
    │   │   │   ├── 📄 event.py
    │   │   │   ├── 📄 photo.py
    │   │   │   └── 📄 user.py
    │   │   ├── 📁 schemas/
    │   │   │   ├── 📄 customer.py
    │   │   │   ├── 📄 event.py
    │   │   │   ├── 📄 photo.py
    │   │   │   └── 📄 user.py
    │   │   ├── 📁 services/
    │   │   │   ├── 📄 drive_service.py
    │   │   │   ├── 📄 google_drive_OLD.py
    │   │   │   └── 📄 google_drive.py
    │   │   ├── 📄 main_old.py
    │   │   └── 📄 main.py
    │   ├── 📁 tests/
    │   ├── 📄 alembic.ini
    │   ├── 📝 DRIVE_SETUP_IMPLEMENTATION_PLAN.md
    │   ├── 📋 package-lock.json
    │   └── 📄 requirements.txt
    ├── 📁 docs/
    │   ├── 🌐 SPRINT_PLANNING_VISUAL_UPDATED_V2.html
    │   ├── 📝 VOORTGANG_EN_VOLGENDE_STAPPEN_V3.md
    │   └── 📝 WORKSPACE_ARCHITECTURE_PLAN.md
    ├── 📁 frontend/
    │   ├── 📁 src/
    │   │   ├── 📁 components/
    │   │   │   ├── 📄 DriveSetup.jsx
    │   │   │   ├── 📄 GoogleOAuthButton.jsx
    │   │   │   └── 📄 ProtectedRoute.jsx
    │   │   ├── 📁 contexts/
    │   │   │   └── 📄 AuthContext.jsx
    │   │   ├── 📁 pages/
    │   │   │   ├── 📄 AuthCallback.jsx
    │   │   │   ├── 📄 AuthError.jsx
    │   │   │   ├── 📄 Dashboard.jsx
    │   │   │   ├── 📄 DriveSetup.jsx
    │   │   │   └── 📄 Login.jsx
    │   │   ├── 📁 services/
    │   │   │   ├── 🟨 api.js
    │   │   │   └── 🟨 auth.js
    │   │   ├── 📁 utils/
    │   │   │   └── 🟨 tokenManager.js
    │   │   ├── 📄 App.jsx
    │   │   └── 📄 index.jsx
    │   ├── 🌐 index.html
    │   ├── 📋 package-lock.json
    │   ├── 📋 package.json
    │   └── 🟨 vite.config.js
    └── 📝 README.md
```

## Legenda

- 📁 Folders
- 🐘 PHP bestanden
- 🟨 JavaScript bestanden
- 🎨 CSS bestanden
- 🌐 HTML bestanden
- 📋 JSON bestanden
- 📝 Markdown bestanden
- 🖼️ Afbeeldingen
- 📄 Overige bestanden
