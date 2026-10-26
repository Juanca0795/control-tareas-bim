-- CONFIGURACIÓN OPCIONAL - FOTOGRAFÍAS BIM
-- Ejecutar MANUALMENTE en Supabase > SQL Editor, solo si se acepta el riesgo descrito.
-- NO modifica las tablas de tareas ni elimina registros.
-- IMPORTANTE: la app NO tiene autenticación individual (comparte cliente "anon").
-- Estas políticas permiten que cualquier persona con la clave pública del proyecto
-- (visible en el navegador) suba y lea imágenes del bucket. Para fotografías
-- confidenciales, implementar Supabase Auth + políticas por usuario ANTES de habilitarlo.

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('bim-evidencias','bim-evidencias',false,5242880,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- Acceso anónimo limitado a la carpeta bim-tasks dentro de este depósito.
-- Es funcional pero NO autoriza ni identifica al usuario final.
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='storage'
                 and tablename='objects' and policyname='bim_evidences_read_anon') then
    create policy bim_evidences_read_anon on storage.objects
      for select to anon
      using (bucket_id='bim-evidencias'
             and (storage.foldername(name))[1]='bim-tasks');
  end if;

  if not exists (select 1 from pg_policies where schemaname='storage'
                 and tablename='objects' and policyname='bim_evidences_insert_anon') then
    create policy bim_evidences_insert_anon on storage.objects
      for insert to anon
      with check (bucket_id='bim-evidencias'
                  and (storage.foldername(name))[1]='bim-tasks');
  end if;
end $$;

-- Se omite deliberadamente la política de borrado anónimo. En el formulario,
-- quitar una fotografía oculta su referencia mediante un marcador de eliminación.
-- El archivo físico permanece hasta una purga administrativa segura.
-- Para producción: sustituir TODAS las políticas anon por políticas authenticated
-- vinculadas al usuario autenticado y habilitar eliminación verificada.
