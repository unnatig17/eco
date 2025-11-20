public function up(): void
{
    Schema::create('processing', function (Blueprint $table) {
        $table->id('processing_id');
        $table->unsignedBigInteger('waste_classification_id');
        $table->string('processing_method');
        $table->text('processing_description')->nullable();
        $table->decimal('cost', 10, 2);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('processing');
}
