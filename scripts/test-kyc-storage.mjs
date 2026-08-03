const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const svc = process.env.SUPABASE_SERVICE_ROLE_KEY
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const testPath = `__e2e__/${crypto.randomUUID()}.pdf`

const upRes = await fetch(`${url}/storage/v1/object/kyc-documents/${testPath}`, {
  method: 'POST',
  headers: { apikey: svc, Authorization: `Bearer ${svc}`, 'Content-Type': 'application/pdf' },
  body: '%PDF-1.4 test',
})
console.log('service-role pdf upload:', upRes.status, upRes.statusText)

const anonSigned = await fetch(`${url}/storage/v1/object/sign/kyc-documents/${testPath}`, {
  method: 'POST',
  headers: { apikey: anon, Authorization: `Bearer ${anon}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ expiresIn: 60 }),
})
console.log('anon sign (private):', anonSigned.status, anonSigned.statusText)

const svcSigned = await fetch(`${url}/storage/v1/object/sign/kyc-documents/${testPath}`, {
  method: 'POST',
  headers: { apikey: svc, Authorization: `Bearer ${svc}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ expiresIn: 60 }),
})
const signedBody = await svcSigned.json()
console.log('service sign:', svcSigned.status, signedBody.signedUrl ? 'OK' : JSON.stringify(signedBody))

const delRes = await fetch(`${url}/storage/v1/object/kyc-documents/${testPath}`, {
  method: 'DELETE',
  headers: { apikey: svc, Authorization: `Bearer ${svc}` },
})
console.log('cleanup:', delRes.status)
