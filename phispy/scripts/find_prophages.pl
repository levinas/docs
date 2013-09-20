use strict;
use Bio::KBase::Phispy::Client;
use Getopt::Long;
use JSON::XS;
use Data::Dumper;
use Pod::Usage;

=head1 NAME

find_prophages

=head1 SYNOPSIS

find_prophages training-set-id < genome > genome.with.prophages 

=head1 DESCRIPTION

Use the phispy service to find prophages in a given genome. The genome
input is a genome typed object as generated by L<cs_to_genome> or 
L<annotate_genome>. The output is a genome typed object with prophage
features added. 

The training set id notes the closest training set to the genome being
analyzed. You may use the get_all_training_sets command to enumerate the sets.
If you don't know which set to use, use set 0 which is the generic training set.

=head1 COMMAND-LINE OPTIONS

Usage: find_prophages training-set-id < genome > genome.with.prophages 

	training-set-id	Numeric training set ID, as defined by L<get_all_training_sets>

	-h or --help displays this page.

=head1 AUTHORS

Phispy service by Sajia Akhter of the Rob Edwards lab. Wrapper by Robert Olson at Argonne National Laboratory.

=cut

my $url;
my $port;
my $help;

my $usage = "Usage: find_prophages training-set-id < genome > genome.with.prophages \n";

my $rc = GetOptions("port=s" => \$port,
		    "url=s"  => \$url,
		    "h" => \$help,
		    "help" => \$help,
		    ) or pod2usage(0);
pod2usage(-exitstatus => 0,
	  -output => \*STDOUT,
	  -verbose => 2,
	  -noperldoc => 1,
	 ) if $help;

if (!$rc || @ARGV != 1)
{
    pod2usage(0);
}

my $training_set_id = shift;

if (!$url)
{
    if ($port)
    {
	$url = "http://localhost:$port/";
    }
#    else
#    {
#	die "No URL or port specified\n";
#    }
}
elsif ($url && $port)
{
    $url = $url . ":$port";
}

my $client = Bio::KBase::Phispy::Client->new($url);

my $json = JSON::XS->new;

my $input_genome;
{
    local $/;
    undef $/;
    my $input_genome_txt = <STDIN>;
    $input_genome = $json->decode($input_genome_txt);
}

my($output_genome, $analysis) = $client->find_prophages($training_set_id, $input_genome);
#print Dumper($output_genome, $analysis);

my $return = $json->encode($output_genome);
print $return;