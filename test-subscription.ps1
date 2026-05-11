# =============================================
# Test Federated Subscription - Apollo Router
# Save as: test-subscription.ps1
# =============================================

$endpoint = "http://localhost:4000/"

$body = @{
    query = "subscription SubscribeToMessagesInConversation(`$messageInConversationId: ID!) { messageInConversation(id: `$messageInConversationId) { id text sentTime } }"
    variables = @{
        messageInConversationId = "wardy-eves-chat"
    }
} | ConvertTo-Json -Depth 10

Write-Host "Sending subscription request to $endpoint..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $endpoint `
        -Method Post `
        -Headers @{
            'accept' = 'multipart/mixed;subscriptionSpec=1.0, application/json'
            'content-type' = 'application/json'
        } `
        -Body $body `
        -Verbose

    Write-Host "Success! Response received:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "Request failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Body: $errorBody" -ForegroundColor Red
    }
}