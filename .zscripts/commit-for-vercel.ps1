# Commit with a GitHub email Vercel accepts (not @users.noreply.github.com).
# Usage:
#   $env:GIT_COMMIT_EMAIL = "your-primary@gmail.com"   # from github.com/settings/emails
#   $env:GIT_COMMIT_NAME = "Abdallahe Benahmed"
#   .\.zscripts\commit-for-vercel.ps1 "your commit message"

param(
  [Parameter(Mandatory = $true)]
  [string]$Message
)

$email = $env:GIT_COMMIT_EMAIL
$name = $env:GIT_COMMIT_NAME

if (-not $email -or $email -match 'users\.noreply\.github\.com') {
  Write-Error "Set GIT_COMMIT_EMAIL to your primary verified GitHub email (github.com/settings/emails). Noreply addresses are blocked by Vercel."
  exit 1
}

if (-not $name) { $name = "Abdallahe Benahmed" }

$env:GIT_AUTHOR_NAME = $name
$env:GIT_AUTHOR_EMAIL = $email
$env:GIT_COMMITTER_NAME = $name
$env:GIT_COMMITTER_EMAIL = $email

git add -A
git commit -m $Message
Write-Host "Committed as $name <$email>"
